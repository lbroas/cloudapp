# CloudApp

e2e tests for the CloudApp

## Getting Started

### Prerequisites

- npm

### Installation

1. Clone the repo.

```sh
git clone git@github.com:lbroas/cloudapp.git
```

2. Install NPM packages.

```shell
npm install
```

## Usage

Specs can be run from the command line or from the Cypress Test Runner's GUI.

### Executing specs from the command line

```shell
  # run the entire suite
  npx cypress run

  # run headless chrome
  npx cypress run --headless --browser chrome

  # run an individual spec file
  npx cypress run --spec "cypress/integration/login/login-spec.js"

  # run all specs within the folder matching the glob (Note: Using double quotes is strongly recommended.
  npx cypress run --spec "cypress/integration/login/**/*"
```

### Executing specs from the GUI

1. Open the Cypress Test Runner and click on an **individual** spec or click **Run all Specs**

```shell
npx cypress open
```

2. The Cypress Test Runner will open a new browser window and then execute the spec.
