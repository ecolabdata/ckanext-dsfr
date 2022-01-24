# ckanext-theme-design-system-fr

Template CKAN implémentant le [Système de Design de l'État](https://www.systeme-de-design.gouv.fr/).


## Installation

To install ckanext-theme-design-system-fr:

1. Activate your CKAN virtual environment, for example:

     . /usr/lib/ckan/default/bin/activate

2. Clone the source and install it on the virtualenv

```bash
    git clone https://github.com//ckanext-theme-design-system-fr.git
    cd ckanext-theme-design-system-fr
    pip install -e .
```

3. Add `theme_design_system_fr` to the `ckan.plugins` setting in your CKAN
   config file (by default the config file is located at
   `/etc/ckan/default/ckan.ini`).

4. Restart CKAN.


## Developer installation

To install ckanext-theme-design-system-fr for development, activate your CKAN virtualenv and
do:

    git clone https://github.com//ckanext-theme-design-system-fr.git
    cd ckanext-theme-design-system-fr
    python setup.py develop
    pip install -r dev-requirements.txt


## Compatibility

Compatibility with core CKAN versions:

| CKAN version    | Compatible?   |
| --------------- | ------------- |
| 2.6 and earlier | not tested    |
| 2.7             | not tested    |
| 2.8             | not tested    |
| 2.9             | yes           |

## License

[AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)
