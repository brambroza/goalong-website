import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Old WordPress "custom layout" pages lived at /?alb_custom_layout=<slug>. */
const layoutMap: Record<string, string> = {
  "network-service": "/network-service",
  "ma-cisco": "/ma-cisco",
  "บริการต่ออายุ-ma-fortigate": "/ma-fortigate",
  "ma-fortigate": "/ma-fortigate",
};

export function proxy(request: NextRequest) {
  const layout = request.nextUrl.searchParams.get("alb_custom_layout");
  if (!layout) return NextResponse.next();

  let key = layout;
  try {
    key = decodeURIComponent(layout).toLowerCase();
  } catch {
    /* keep raw value */
  }
  const target = new URL(layoutMap[key] ?? "/network-service", request.url);
  target.search = "";
  return NextResponse.redirect(target, 301);
}

export const config = {
  matcher: "/",
};
