make:
	echo "Building..."
	mkdir -p build
	cd src && npm install && npm install -g node-git-version && node-git-version && node build.js
	cd build && sed -i.bak "s/__REVISION__/$$(git rev-parse HEAD)/g" index.* && rm *.bak
