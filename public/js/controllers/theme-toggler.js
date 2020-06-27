import { localStorageService } from "../services/local-storage-service.js";

const storageName = "theme";
const storageService = localStorageService;

function initializeStorage({
  defaultTheme,
  alternateTheme,
  themeChangedHandler,
}) {
  const currentValue = storageService.getItem(storageName);
  if (currentValue !== alternateTheme) {
    storageService.setItem(storageName, defaultTheme);
  }
  themeChangedHandler(storageService.getItem(storageName));
}

export class ThemeToggler {
  constructor(defaultTheme, alternateTheme, themeChangedHandler) {
    this.defaultTheme = defaultTheme;
    this.alternateTheme = alternateTheme;
    this.themeChangedHandler = themeChangedHandler;

    initializeStorage(this);
  }

  toggleTheme = () => {
    const newTheme =
      storageService.getItem(storageName) === this.defaultTheme
        ? this.alternateTheme
        : this.defaultTheme;
    storageService.setItem(storageName, newTheme);

    this.themeChangedHandler(newTheme);
  };
}
