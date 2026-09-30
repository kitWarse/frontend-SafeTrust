# Contributing

## Responsive-layout check

Before submitting a page-layout change, verify the affected routes at 360, 390,
768, 1024, and 1280 pixels. In each viewport, paste this check into DevTools:

```js
document.documentElement.scrollWidth > window.innerWidth &&
  console.warn(
    "Horizontal overflow!",
    [...document.querySelectorAll("*")].filter(
      (element) => element.getBoundingClientRect().right > window.innerWidth,
    ),
  );
```

Tables must render their mobile card presentation below the `md` breakpoint,
and long identifiers must truncate without increasing the document width.
