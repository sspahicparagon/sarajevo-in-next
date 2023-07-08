export type TemplateGridItem = {
  title?: string | null;
  id: number;
  image: string;
}

export type LocationGridItem = TemplateGridItem & { id?: number, image?: string };

