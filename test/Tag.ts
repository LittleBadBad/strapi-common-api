
export interface Tag {
  id: number;
  attributes: {
    name?: string;
    locale: string;
    localizations?: { data: Tag[] }
  }
}
