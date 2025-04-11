# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and SCSS. This project showcases work through a filterable gallery of case studies and gallery items.

## Features

- Responsive design that works well on all screen sizes
- Filterable portfolio items by category/thread
- Interactive gallery viewer for portfolio items
- Detailed case study pages
- Modern, clean UI with smooth animations
- Built with React, TypeScript, and SCSS
- Easy deployment to GitHub Pages

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danielreeves/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
whisperwork/
├── public/
│   ├── data/           # JSON data files
│   ├── images/         # Image assets
│   └── index.html
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── styles/        # SCSS files
│   ├── types/         # TypeScript interfaces
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Application entry point
└── package.json
```

## Data Structure

The application uses several JSON files to manage content:

- `threads.json`: Categories/threads of work
- `all_work.json`: All portfolio items (both gallery and case studies)
- `gallery_items.json`: Detailed gallery item information
- `caseStudy_[name].json`: Individual case study data

## Deployment

To deploy to GitHub Pages:

1. Update the `homepage` field in `package.json` to match your GitHub Pages URL:
   ```json
   {
     "homepage": "https://[username].github.io/Portfolio"
   }
   ```

2. Deploy the application:
   ```bash
   npm run deploy
   ```

This will build the application and push it to the `gh-pages` branch of your repository.

## Customization

### Adding New Work Items

1. Add the item to `all_work.json`
2. If it's a gallery item, add details to `gallery_items.json`
3. If it's a case study, create a new `caseStudy_[name].json` file
4. Add any associated images to the `public/images` directory

### Modifying Styles

The main styles are in `src/styles/main.scss`. The application uses SCSS modules for component-specific styling.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
