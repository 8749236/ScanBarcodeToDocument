

app.service('DocumentStoreService', function($rootScope) {
	this._prefix = "barcorder_doc_";
	
	// Under construction
	this.getDocumentIds = function() {
		var keys = [];
		// Get all keys in localStorage
		for(var i = 0; i < localStorage.length; ++i) {
			keys.push(localStorage.key(i));
		}
		// Filter by prefix
		return keys.filter(v => v.search(this._prefix) >= 0);
	};
	
	this.getDocument = function(id) {
		console.log(localStorage.getItem(this._prefix + id));
		return JSON.parse(localStorage.getItem(this._prefix + id));
	};
	
	this.setDocument = function(id, doc) {
		// Local storage may throw exception
		// For example, when its out of space
		if(!id || id.length == 0) return false;
		try {
			localStorage.setItem(this._prefix + id, JSON.stringify(doc));
		} catch(e) {
			// TODO: make a nice modal for errors
			alert("Error has occured when attempting to save document: " + e)
			console.error(e);
			return false;
		}
		return true;
	};
	
	this.deleteDocument = function(id) {
		if(!id || id.length == 0) return false;
		localStorage.removeItem(this._prefix + id)
		return true;
	}
	console.log(1);
});