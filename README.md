# web-site-react
## Development

    $ npm install
    $ bower install
    $ grunt serve

## Deployment
We use [Divshot](http://www.divshot.com) for deployment.

We have three environments: development (master branch), staging (staging branch) and production (production branch).

Divshot plays nicely with Grunt so you can build and deploy to any of the environments from the command line:

    $ grunt deploy:development
    $ grunt deploy:staging
    $ grunt deploy:production

These commands build the application locally and upload the `/dist` folder.
