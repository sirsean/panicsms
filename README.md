# panicsms

Send an SMS with one tap to predefined emergency contacts.

It runs in Docker.

# Build

Install some Node stuff:

```
npm install -g browserify
npm install
```

Compile the Javascript:

```
./compile.sh
```

Build the Docker image:

```
docker build -t panicsms .
```

# Run

```
./dev_run.sh
```

# Use

Then you can access it at http://localhost:9111
