import {NextRequest} from "next/server";

export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(name: string, req?: NextRequest): string | null {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
  } else if (req) {
    const cookie = req.cookies.get(name);
    return cookie ? cookie.value : null;
  }
  return null;
}


export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
}
