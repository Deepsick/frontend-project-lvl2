### Hexlet tests and linter status:
[![Actions Status](https://github.com/Deepsick/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Deepsick/frontend-project-lvl2/actions)
[![Node CI](https://github.com/Deepsick/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Deepsick/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/75187fa0cf533b7a97dd/maintainability)](https://codeclimate.com/github/Deepsick/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/75187fa0cf533b7a97dd/test_coverage)](https://codeclimate.com/github/Deepsick/frontend-project-lvl2/test_coverage)

# Gendiff

Read files and return diff according to picked format


## Installation

NodeJs packaging and dependency management tool ```npm``` should be preinstalled.

```bash
make install
```


## Usage

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

### JSON

[![asciicast](https://asciinema.org/a/q0RPnWBq5XKBq9eYMs708nH35.svg)](https://asciinema.org/a/q0RPnWBq5XKBq9eYMs708nH35)

### Stylish

[![asciicast](https://asciinema.org/a/zdi2AEVMhOcqfAY0rmJODDRkN.svg)](https://asciinema.org/a/zdi2AEVMhOcqfAY0rmJODDRkN)

### Plain

[![asciicast](https://asciinema.org/a/oR66QngwAdPgzvc82raTVjJQd.svg)](https://asciinema.org/a/oR66QngwAdPgzvc82raTVjJQd)

## Testing

```bash
make install
make lint
make test
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](https://choosealicense.com/licenses/mit/)