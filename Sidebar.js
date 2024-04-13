import { Card, CardContent, Typography, Link } from '@material-ui/core';

class Sidebar {
  constructor() {
    this.element = document.getElementById('sidebar');
  }

  render(data) {
    data.forEach(item => {
      const card = document.createElement('div');
      card.innerHTML = `
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              ${item.fields.name}
            </Typography>
            <Typography variant="body2" component="p">
              ${item.fields.description}
            </Typography>
            <Typography variant="body2" component="p">
              Status: <span style="color: ${item.fields.status === 'ongoing' ? 'green' : 'red'};">${item.fields.status}</span>
            </Typography>
            <Link href="${item.fields.url}" target="_blank">More Info</Link>
          </CardContent>
        </Card>
      `;
      this.element.appendChild(card);
    });

    this.element.classList.add('active'); // Show the sidebar
  }
}

export { Sidebar };