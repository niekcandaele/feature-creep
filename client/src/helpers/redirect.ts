export function setRedirect(pathname: string) {
  localStorage.setItem('redirect', pathname);
}
export function getRedirect() {
  const redirect = localStorage.getItem('redirect');
  if (redirect) {
    return redirect;
  }
  return '/workspace';
}
