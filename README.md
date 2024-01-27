
<div align="center">
  
  <h1>Passwise - Password Manager</h1>
  
  ![Project Banner](./readme_assets/readme_banner.png)

  <p>
    <a href="https://github.com/tristan-greffe/passwise">
      <img src="https://awesome.re/badge.svg" alt="awesome" />
    </a>
    <a href="https://github.com/tristan-greffe/passwise/stargazers">
      <img src="https://img.shields.io/github/stars/tristan-greffe/passwise" alt="stars" />
    </a>
    <a href="https://github.com/tristan-greffe/passwise/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/tristan-greffe/passwise.svg" alt="license" />
    </a>
  </p>

 <h4>
    <a href="https://github.com/tristan-greffe/passwise/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/tristan-greffe/passwise/issues/">Request Feature</a>
  </h4>

</div>

## About the Project

<div align="center">
  <img src="./readme_assets/passwise-interface.png" height="auto" width="90%"/>
</div>

**Open source password manager**, based on the **[FeathersJS](https://feathersjs.com/)** & **[ReactJS](https://react.dev/)** frameworks.

### Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,react,mongo,sass,tailwind)](https://skillicons.dev)

## Getting Started

### Step 1: set the required environment variables

| ENV | Description | Required |
|---|---|---|
| `GMAIL_USER` | Email used for gmail account | yes |
| `GMAIL_PASWORD` |  Password for gmail account | yes |
| `GOOGLE_CLIENT_ID` | Customer ID for google authentication | no |
| `GOOGLE_CLIENT_SECRET` | Customer secret key for google authentication | no |

### Step 2: installing

#### From source code

```bash
git clone https://github.com/tristan-greffe/passwise.git

// Run the server/API
cd passwise/api
yarn install
yarn dev

// In another terminal run the client app
cd passwise
yarn install
yarn dev
```

> [!NOTE]
> Then point your browser to localhost:8080

#### Using Docker

```bash
// Retrieve the latest available dev tag
docker pull codask/passwise:dev

// Run the MongoDB and passwise containers
docker-compose up -d

// Stop the MongoDB and passwise containers
docker-compose down

// Stop the MongoDB and passwise containers erasing DB data
docker-compose down -v
```
https://github.com/tristan-greffe/passwise/blob/cca6be3bf61442381f9ea5f9f22422b682bee952/readme_assets/docker-compose.yml#L1-L26

> [!NOTE]
> Then point your browser to localhost:8081

## Contributing

Contributions are always welcome!

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork it! 🤙

2. Create your feature branch: `git checkout -b my-new-feature`

3. Commit your changes: `git commit -m "Add some feature"`

4. Push to the branch: `git push origin my-new-feature`

5. Submit a pull request 👍

## License

This project is licensed under the MIT License - see the [license file](./LICENSE) for details
