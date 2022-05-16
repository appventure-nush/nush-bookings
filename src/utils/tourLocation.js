export function getTourLocation(routeId) {
  switch (routeId[0]) {
    case 'A':
      return 'Theatrette';
    case 'B':
      return 'Year 1 Classrooms';
    case 'C':
      return 'The House Murals';
    case 'D':
      return 'Ecopond';
  }
}
