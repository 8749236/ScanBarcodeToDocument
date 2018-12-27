

app.service('DocumentStoreService', function($rootScope) {
	this._prefix = "barcorder_doc_";
	
	// Under construction
	this.getDocumentList = function() {
		var docList = [];
		// Get all keys in localStorage
		for(var i = 0; i < localStorage.length; ++i) {
			var key = localStorage.key(i);
			// Filter by prefix
			if(key.search(this._prefix) < 0) continue;
			var tmp = JSON.parse(localStorage.getItem(key));
			docList.push({ id: tmp.id, type: tmp.type, description: tmp.description });
		}
		return docList;
	};
	
	this.getDocument = function(id) {
		return JSON.parse(localStorage.getItem(this._prefix + id));
	};
	
	this.setDocument = function(id, doc) {
		// Local storage may throw exception
		// For example, when its out of space
		if(!id || id.length == 0 || this.getDocument(id)) return false;
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
});