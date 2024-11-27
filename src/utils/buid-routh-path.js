
export function buidRouterPath(path) {
  const routeParametersRegex = /:([a-zA-zZ]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}