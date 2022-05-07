""" Build index from directory listing

make_index.py </path/to/directory> [--header <header text>]
"""

# https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages
# https://github.com/libthinkpad/apindex

INDEX_TEMPLATE = r"""
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>INDEX</title>
    </head>
    <body>
        % if header is not None:
            <h2>${header}</h2>
        % endif
        <p>
            <ul>
                % for name in names:
                    <li><a href="${name}">${name}</a></li>
                % endfor
            </ul>
        </p>
    </body>
</html>
"""

EXCLUDED = ['index.html', 'make_index.py', 'refresh_indexes.py', '.git', 'README.md', '.gitignore']

import os
import argparse

# May need to do "pip install mako"
from mako.template import Template


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory")
    parser.add_argument("--header")
    args = parser.parse_args()
    fnames = [fname for fname in sorted(os.listdir(args.directory))
              if fname not in EXCLUDED]
    # header = (args.header if args.header else os.path.basename(args.directory))
    header = (args.header if args.header else None)
    print(Template(INDEX_TEMPLATE).render(names=fnames, header=header))


if __name__ == '__main__':
    main()
