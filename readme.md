[![Code Climate](https://codeclimate.com/github/ramongr/poppins/badges/gpa.svg)](https://codeclimate.com/github/ramongr/poppins)
# Poppins - A checkbox hierarchy manager

Poppins is a minimal checkbox hierarchy manager.

## How it works

You need to put the checkboxes inside a div `div data-poppins="true"`, the root checkbox has the tag `data-poppins-root="true"`.
Every checkbox needs a unique id that's put on the tag `data-poppins-id=<YOUR_UNIQUE_ID>` and if it's a child node it also requires `data-poppins-parent=<PARENTS_UNIQUE_ID>`