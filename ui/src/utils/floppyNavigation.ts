import { RouteAlias } from '@/router/alias';
import Storage from '@/utils/storage';
import { REDIRECT_PATH_STORAGE_KEY } from '@/common/constants';

const differentCurrent = (target: string, base?: string) => {
  base ||= window.location.origin;
  const targetUrl = new URL(target, base);
  return targetUrl.toString() !== window.location.href;
};

const storageLoginRedirect = () => {
  const { pathname } = window.location;
  if (pathname !== RouteAlias.login && pathname !== RouteAlias.register) {
    const loc = window.location;
    const redirectUrl = loc.href.replace(loc.origin, '');
    Storage.set(REDIRECT_PATH_STORAGE_KEY, redirectUrl);
  }
};
/**
 * only navigate if not same as current url
 * @param pathname
 * @param callback
 */
const navigate = (pathname: string, callback: Function) => {
  if (pathname === RouteAlias.login) {
    storageLoginRedirect();
  }
  if (differentCurrent(pathname)) {
    callback();
  }
};

/**
 * auto navigate to login page with redirect info
 */
const navigateToLogin = (callback?: Function) => {
  navigate(RouteAlias.login, () => {
    if (callback) {
      callback(RouteAlias.login);
    } else {
      window.location.replace(RouteAlias.login);
    }
  });
};

export const floppyNavigation = {
  differentCurrent,
  navigate,
  navigateToLogin,
};
