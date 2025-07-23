export interface ISidebarMenus {
  id: number;
  icon: () => JSX.Element;
  link: string;
  title: string;
  subMenus?: {
    title: string;
    link: string;
  }[]
}