const artistList = [{
  name: 'letha wilson',
  imageURL: 'https://www.lethaprojects.com/visuals/images/outdoors/ghostofatree-right-view.jpg'
}, {
  name: 'genesis baez',
  imageURL: 'http://media.virbcdn.com/cdn_images/resize_1600x1600/23/ac1718b745965aed-Baez_1.jpg'
}, {
  name: 'sarah-louise barbett',
  imageURL: 'https://aisselles.files.wordpress.com/2010/12/img_0016.jpg?w=1104'
}, {
  name: 'jessica halonen',
  imageURL: 'http://www.jessicahalonen.com/files/gimgs/44_spliced-branch-ball-1.jpg'
}, {
  name: 'laura owens',
  imageURL: 'https://www.owenslaura.com/wp-content/uploads/2013/01/HQ-16LO9359P-Untitled.jpg'
}, {
  name: 'deborah roberts',
  imageURL: 'https://i0.wp.com/conflictofinteresttx.com/wp-content/uploads/2017/07/The-Power-dance-30x22-2017.jpeg?w=469'
}, {
  name: 'ana esteve llorens',
  imageURL: 'http://www.anaestevellorens.com/projects/project6/07%20Quasy%20Infinite.jpg'
}, {
  name: 'jackie furtado',
  imageURL: 'https://s3.amazonaws.com/artfare-production-mobile/Artworks/Images/Image-1/image-1-d67b0616-077b-4fee-97be-275e4dde6107.jpg'
}, {
  name: 'viviane sassen',
  imageURL: 'https://www.vivianesassen.com/site/assets/files/2940/umbra_nab_vs_3942.0x1500.jpg'
}]; //claire falkenberg
//https://clairefalkenberg.com/floating
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcnRpc3RMaXN0IiwibmFtZSIsImltYWdlVVJMIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxVQUFVLEdBQUcsQ0FDakI7QUFDRUMsRUFBQUEsSUFBSSxFQUFFLGNBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0FEaUIsRUFLakI7QUFDRUQsRUFBQUEsSUFBSSxFQUFFLGNBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0FMaUIsRUFTakI7QUFDRUQsRUFBQUEsSUFBSSxFQUFFLHNCQURSO0FBRUVDLEVBQUFBLFFBQVEsRUFBRTtBQUZaLENBVGlCLEVBYWpCO0FBQ0VELEVBQUFBLElBQUksRUFBRSxpQkFEUjtBQUVFQyxFQUFBQSxRQUFRLEVBQUU7QUFGWixDQWJpQixFQWlCakI7QUFDRUQsRUFBQUEsSUFBSSxFQUFFLGFBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0FqQmlCLEVBcUJqQjtBQUNFRCxFQUFBQSxJQUFJLEVBQUUsaUJBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0FyQmlCLEVBeUJqQjtBQUNFRCxFQUFBQSxJQUFJLEVBQUUsb0JBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0F6QmlCLEVBNkJqQjtBQUNFRCxFQUFBQSxJQUFJLEVBQUUsZ0JBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0E3QmlCLEVBaUNqQjtBQUNFRCxFQUFBQSxJQUFJLEVBQUUsZ0JBRFI7QUFFRUMsRUFBQUEsUUFBUSxFQUFFO0FBRlosQ0FqQ2lCLENBQW5CLEMsQ0F5Q0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFydGlzdExpc3QgPSBbXG4gIHtcbiAgICBuYW1lOiAnbGV0aGEgd2lsc29uJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3LmxldGhhcHJvamVjdHMuY29tL3Zpc3VhbHMvaW1hZ2VzL291dGRvb3JzL2dob3N0b2ZhdHJlZS1yaWdodC12aWV3LmpwZydcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdnZW5lc2lzIGJhZXonLFxuICAgIGltYWdlVVJMOiAnaHR0cDovL21lZGlhLnZpcmJjZG4uY29tL2Nkbl9pbWFnZXMvcmVzaXplXzE2MDB4MTYwMC8yMy9hYzE3MThiNzQ1OTY1YWVkLUJhZXpfMS5qcGcnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnc2FyYWgtbG91aXNlIGJhcmJldHQnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9haXNzZWxsZXMuZmlsZXMud29yZHByZXNzLmNvbS8yMDEwLzEyL2ltZ18wMDE2LmpwZz93PTExMDQnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnamVzc2ljYSBoYWxvbmVuJyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly93d3cuamVzc2ljYWhhbG9uZW4uY29tL2ZpbGVzL2dpbWdzLzQ0X3NwbGljZWQtYnJhbmNoLWJhbGwtMS5qcGcnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnbGF1cmEgb3dlbnMnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cub3dlbnNsYXVyYS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvSFEtMTZMTzkzNTlQLVVudGl0bGVkLmpwZydcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdkZWJvcmFoIHJvYmVydHMnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9pMC53cC5jb20vY29uZmxpY3RvZmludGVyZXN0dHguY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE3LzA3L1RoZS1Qb3dlci1kYW5jZS0zMHgyMi0yMDE3LmpwZWc/dz00NjknXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnYW5hIGVzdGV2ZSBsbG9yZW5zJyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly93d3cuYW5hZXN0ZXZlbGxvcmVucy5jb20vcHJvamVjdHMvcHJvamVjdDYvMDclMjBRdWFzeSUyMEluZmluaXRlLmpwZydcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdqYWNraWUgZnVydGFkbycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vYXJ0ZmFyZS1wcm9kdWN0aW9uLW1vYmlsZS9BcnR3b3Jrcy9JbWFnZXMvSW1hZ2UtMS9pbWFnZS0xLWQ2N2IwNjE2LTA3N2ItNGZlZS05N2JlLTI3NWU0ZGRlNjEwNy5qcGcnXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndml2aWFuZSBzYXNzZW4nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cudml2aWFuZXNhc3Nlbi5jb20vc2l0ZS9hc3NldHMvZmlsZXMvMjk0MC91bWJyYV9uYWJfdnNfMzk0Mi4weDE1MDAuanBnJ1xuICB9XG5dO1xuXG5cblxuLy9jbGFpcmUgZmFsa2VuYmVyZ1xuLy9odHRwczovL2NsYWlyZWZhbGtlbmJlcmcuY29tL2Zsb2F0aW5nIl19