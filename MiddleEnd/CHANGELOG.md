# Change Log

This document tracks changes to Mix.nlu's sample Python application.

## 2017-01-30

* [doc] Updated install steps for Mac for Speex >= 1.2.0 (added `speexdsp`).

## 2016-12-15

* [doc] Fixed a typo in the README.
* [misc] Updated Python dependencies: `aiohttp` and `pyaudio`.
* [misc] Ignore `.DS_store` file from Git.

## 2016-11-21

* [doc] Added a self-referencial CHANGELOG file.

## 2016-11-18

* [feature] Added per-user data upload and data wipe commands.
* [feature] Added a configurable `user_id` parameter to all commands.

## 2016-03-15

* [feature] Added a configurable `language` parameter, instead of hardcoding "eng-USA".

## 2016-02-23

* [docs] Improved troubleshooting of C-bindings libraries.
* [docs] Improved virtualenv documentation.

## 2016-02-11

* [feature] Added a `.gitignore` to ensure credentials are not pushed.
* [fix] Removed partially broken TTS and ASR-only commands.
* [feature] Switched to [argparse](https://docs.python.org/3/library/argparse.html) for the CLI parameters.
* [misc] Added a context manager for the audio recorder.
* [feature] Made `Recorder` class more flexible outside of default values.
* [misc] Improved and linted the module's code.

## 2016-01-16

* [fix] Fixed microphone detection by using the default input device ID.
* [docs] Added usage information on CLI misuse.
* [docs] Added some FAQ, and their solution.
* [docs] Improved wording, and markdown formatting of the README.

## 2015-12-15

* [docs] Added setup information on how to install speex (Mac/Unix).
* [misc] Removed unused dependencies from the `requirements.txt`.
* [docs] Improved the formatting in the README.

## 2015-11-03

* Initial release.
