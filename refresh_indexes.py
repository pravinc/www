""" Build index for all directories inside current path recursively

refresh_indexes.py
"""

import os


def index_dir(dir):
    subdir_present = False
    for dir_entry_path in os.listdir(dir):
        full_path = os.path.join(dir, dir_entry_path)
        if os.path.isdir(full_path):
            subdir_present = True
            index_dir(full_path)

    if subdir_present:
        index_path = os.path.join(dir, 'index.html')
        print("=> creating " + index_path)
        # os.system('python make_index.py ' + dir)
        os.system('python make_index.py ' + dir + ' > ' + index_path)

def main():
    index_dir(os.getcwd())

### entry point
if __name__ == '__main__':
    main()
