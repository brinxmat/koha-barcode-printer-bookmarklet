# Koha barcode printer bookmarklet
A bookmarklet for generating labels in LS.ext (has a dependency on the REST API that isn't standard in Koha).

In any view in Koha that contains 14-digit numeric barcodes, click the bookmarklet and a new window will open that contains the formatted labels.

In views containing many barcode numbers, a label will be created for each barcode; if an area of text is selected, only labels will be created for the barcodes in the area of selected text.

Note that discovery of barcodes is by a simple match of 14 digits surrounded by boundaries (whitespace or punctuation).

The bookmarklet will only work inside Koha and fails silently if there are no 14-digit barcodes in the view.

Creates a 38 mm x 90 mm label with the following information:

- Creator name (cut at 25 characters)
- Title (cut at 25 characters)
- Call number (cut at 25 characters)
- Publication year
- Home branch
- Oslo's kommunenummer (0301)
- Biblionumber
- Copy number (left padded to three characters)
- An interleaved 2 of 5 rendition of the barcode
- A spine-label variant of the call number split according to length (and possibly cut if it is very long)

The label can be printed directly to suitable label printers.

##What is a bookmarklet?
A bookmarklets are bookmarks that hide executable javascript snippets that do things in your webbrowser. This should sound a bit worrying; we're using them for good here, honest.

##Building

You've got two choices:

###Simple, manual
- copy code in ```src/main.js```
- google "simple bookmarklet creator", click a link
- follow instructions

###Build with node
- open a terminal
- install node and npm if you don't have them
- clone the project
- cd into the project
- type ```make```

This produces two files in the build directory: index.html and index.js; the first can be opened in a webbrowser and you can follow the instructions for installation there (you can edit the bookmark name too); the contents of the second file can be copied and pasted into a new bookmark and your desired name for the bookmark can be entered.

##Caveats

- Tested with Chrome/Firefox/Safari
- Will break at some point and need updating
- Norwegian text for Deichman everywhere

##Keeping it all clean — when built with node
Because bookmarklets are getting rolled out all the time, it's nice to be able to check that the version in use is up to date. To do this, just add ```GITREF``` to any URL, hit enter and click the bookmarklet; this will return the git revision number of the version you are using. 

Be aware, however, that you're — of course — looking at the local hash, rather than that of the remote.
