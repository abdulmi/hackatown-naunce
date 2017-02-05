# Mix.nlu sample python application

This document will guide you through the installation, configuration and execution of the Mix.nlu python sample app. You can also find a troubleshooting section at the end for common problems.

*Note: This file is best viewed in a GitHub-flavored MarkDown editor, such as [jbt.github.io/markdown-editor](https://jbt.github.io/markdown-editor)*

## Installation (Mac OS / UNIX)

1. Install [portaudio](http://www.portaudio.com/), to access your audio devices:

    UNIX:

    ```shell
    wget http://www.portaudio.com/archives/pa_stable_v19_20140130.tgz --no-check-certificate
    tar xzf pa_stable_v19_20140130.tgz
    cd portaudio/
    sudo ./configure
    sudo make
    sudo make install
    sudo ldconfig
    ```

    Mac OS (using [homebrew](http://brew.sh/)):

    ```shell
    brew install portaudio
    ```

2. (Optional) Install the [speex](http://www.speex.org/) codec for faster audio stream:

    UNIX:

    ```shell
    wget http://downloads.xiph.org/releases/speex/speexdsp-1.2rc3.tar.gz --no-check-certificate
    tar xzf speexdsp-1.2rc3.tar.gz
    cd speexdsp-1.2rc3/
    sudo ./configure
    sudo make
    sudo make install
    ```

    Mac OS (using [homebrew](http://brew.sh/)):

    ```shell
    brew install speex speexdsp
    ```

3. Set up your [virtual environment](https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments) with python **3.4 or 3.5**:

    ```shell
    python3 -m venv nlu_env
    source nlu_env/bin/activate
    pip install -r requirements.txt
    # Note: Ignore pyspeex install failure if you skipped step 2
    ```

## Configuration

Your `app_id`, `app_key`, and `context_tag` have been autopopulated in the `creds.json` file. Your `app_id` and 128-byte `app_key` come from your [Nuance Developers account](https://developer.nuance.com/public/index.php?task=account).

If you need to modify any of these variables, simply replace the existing strings in the `creds.json` file.  (For example, you may want to perform transactions using a different `context_tag` than what was auto-populated for you.)

*NOTE: If you have no context tag existing, an empty string is populated for the context tag key in the `creds.json` file. As soon as you set up an Application Config, you need to replace this field with the tag you desire to use in your transactions.*

## Running the client

To run the app, navigate to where your `nlu.py` file is located, activate your virtual environment:

```shell
source nlu_env/bin/activate
```

then run one of the following commands:

* For audio + NLU:

    ```shell
    python nlu.py audio
    # 1. Start recording when prompted;
    # 2. Press <enter> when done.

    python nlu.py --user_id="<user-identifier>" audio
    # 1. Start recording when prompted;
    # 2. Press <enter> when done.
    ```

* For text + NLU:

    ```shell
    python nlu.py text "This is the sentence you want to test"
    python nlu.py --user_id="<user-identifier>" text "This is the sentence you want to test"
    ```

* For per user concept data:

    ```shell
    python nlu.py --user_id="<user-identifier>" data_upload "<concept-name>" "dynamic_list.sample.json"
    ```

    ```shell
    python nlu.py --user_id="<user-identifier>" data_wipe
    ```

* To display CLI usage:

    ```shell
    python nlu.py --help
    ```

## Troubleshooting

1. Running the sample gives me a `SyntaxError`.

    Ensure you're running python 3.4+

    ```shell
    python --version
    ```

2. When I try to run the code, it tells me that chardet is not recognized.

    `aiohttp` failed to install. Run:

    ```shell
    pip install aiohttp==1.1.6
    ```

3. `pyaudio` fails to install, with the following error message:
    ```shell
    src/_portaudiomodule.c:29:10: fatal error: 'portaudio.h' file not found
    #include "portaudio.h"
             ^
    1 error generated.
    error: command '/usr/bin/clang' failed with exit status 1
    ```

    or `pyspeex`:

    ```shell
    speex.c:343:10: fatal error: 'speex/speex_types.h' file not found
    #include "speex/speex_types.h"
             ^
    1 error generated.
    error: command '/usr/bin/clang' failed with exit status 1
    ```

    This problem might occur when the corresponding C libraries were not installed in the expected directory. You will need to install the python packages that depend on them with additional options:

    ```shell
    pip install --global-option='build_ext' --global-option='-I/usr/local/include' --global-option='-L/usr/local/lib' pyaudio
    pip install --global-option='build_ext' --global-option='-I/usr/local/include' --global-option='-L/usr/local/lib' git+https://github.com/NuanceDev/pyspeex.git@0.9.0#egg=pyspeex
    ```
