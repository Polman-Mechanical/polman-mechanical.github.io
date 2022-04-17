import { publish } from 'gh-pages';

publish('build', {
    branch: 'gh-pages',
    repo: 'git@github.com:Polman-Mechanical/polman-mechanical.github.io.git',
    user: {
      name: 'Cole Denslow',
      email: 'cmdenslow14@hotmail.com',
    },
    dotfiles: true,
  }, (e) => {
    if (e) {
      console.error('Deploy Failed!');
      console.error(e);
    } else {
      console.log('Deploy Complete!');
    }
  },
);