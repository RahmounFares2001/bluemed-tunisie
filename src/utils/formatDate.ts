import { format, formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export function formatDate(iso: string): string {
  try {
    return format(new Date(iso), "d MMMM yyyy", { locale: ar });
  } catch {
    return iso;
  }
}

export function formatDateTime(iso: string): string {
  try {
    return format(new Date(iso), "d MMM yyyy - HH:mm", { locale: ar });
  } catch {
    return iso;
  }
}

export function formatRelative(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ar });
  } catch {
    return iso;
  }
}
