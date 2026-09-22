interface Menu {
  id: number
  href: string;
  label: string;
}


export const navigations: Menu[] = [
    { id: 1, href: "/", label: "خانه" },
    { id: 2, href: "/dashboard", label: "داشبورد" },
    { id: 3, href: "/profile", label: "پروفایل" },
  ];

  // ohkl