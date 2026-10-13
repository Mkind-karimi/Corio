
export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationItem = NavigationLink & {
  id: string;
  children?: NavigationLink[];
};

export const mainNavigation: NavigationItem[] = [
  {
    id: "collection",
    label: "کالکشن",
    href: "/#bestsellers",
    children: [
      {
        label: "گیمینگ",
        href: "/shop?collection=gaming",
      },
    ],
  },
  {
    id: "men",
    label: "مردانه",
    href: "/category/men",
    children: [
      {
        label: "کیف پول مردانه",
        href: "/category/men?subcategory=wallet",
      },
      {
        label: "کیف دستی مردانه",
        href: "/category/men?subcategory=handbag",
      },
      {
        label: "کیف دوشی مردانه",
        href: "/category/men?subcategory=shoulder-bag",
      },
    ],
  },
  {
    id: "women",
    label: "زنانه",
    href: "/category/women",
    children: [
      {
        label: "کیف پول زنانه",
        href: "/category/women?subcategory=wallet",
      },
      {
        label: "کیف دستی زنانه",
        href: "/category/women?subcategory=handbag",
      },
      {
        label: "کیف دوشی زنانه",
        href: "/category/women?subcategory=shoulder-bag",
      },
    ],
  },
  {
    id: "accessories",
    label: "اکسسوری",
    href: "/category/accessories",
    children: [
      {
        label: "بوک‌مارک",
        href: "/category/accessories?subcategory=bookmark",
      },
      {
        label: "جاسوییچی",
        href: "/category/accessories?subcategory=keychain",
      },
    ],
  },
];
