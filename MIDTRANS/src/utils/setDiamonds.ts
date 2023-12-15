export default function setDiamonds(diamonds_id: string) {
  switch (diamonds_id) {
    case "diamond-100": {
      return 100;
    }
    case "diamond-250": {
      return 250;
    }
    case "diamond-500": {
      return 500;
    }
    case "diamond-1000": {
      return 1000;
    }
    default: {
      return 1;
    }
  }
}
