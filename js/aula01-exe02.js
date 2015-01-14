/**
* Find github inssues
*/
function findInssue() {
	function GithubRepo(username, reponame) {
		this.username = username;
		this.reponame = reponame;
		this.list;
	}

	GithubRepo.prototype.getInssues = function() {
		var url = 'https://api.github.com/repos/'+this.username+'/'+this.reponame+'/issues';
		var self = this;
		return $.ajax({
			url: url,
			beforeSend: function() {
				$('#username, #reponame, #sc-btn-go').prop('disabled', true);
				$('#sc-btn-go').html('<i class="fa fa-spinner fa-spin"></i> Go!');
			},
			complete: function() {
				$('#username, #reponame, #sc-btn-go').prop('disabled', false);
				$('#sc-btn-go').html('Go!');
			},
			success: function(result) {
				self.list = result;
			}
		});
	}

	GithubRepo.prototype.populateInssues = function(element) {
		var html;
		for (i in this.list) {
			html += "<tr>";
			html += 	"<td>";
			html += 		this.list[i]['number'];
			html += 	"</td>";
			html += 	"<td>";
			html += 		this.list[i]['title'];
			html += 	"</td>";
			html += "</tr>";
		}
		$(element+' tbody').hide().html(html).fadeIn();
	}

	var gitData = {
		username: $('#username').val(),
		reponame: $('#reponame').val()
	}
	var readRepo = new GithubRepo(gitData.username, gitData.reponame);

  readRepo.getInssues()
	  .done(function() {
	  	readRepo.populateInssues('#inssue');
	  });
}



/**
* Reset table
*/
function resetTable(element) {
	var html;
	html += "<tr>";
	html += 	"<td colspan='2' class='text-center'>";
	html += 		"Nenhum resultado encontrado!";
	html += 	"</td>";
	html += "</tr>";
	$(element+' tbody').hide().html(html).fadeIn();
}