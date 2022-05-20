export function getTourLocation(routeId) {
  switch (routeId[0]) {
    case 'A':
      return 'Theatrette';
    case 'B':
      return 'Year 1 Study Corner';
    case 'C':
      return 'Back of Concourse';
    case 'D':
      return 'Year 5 Study Corner';
  }
}
