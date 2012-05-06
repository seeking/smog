// Generated by CoffeeScript 1.3.1
(function() {

  define(["smog/server", "smog/notify", "smog/editor", "templates/edit"], function(server, notify, editor, templ) {
    return function(_arg) {
      var edit, id, name, realname;
      name = _arg.name, id = _arg.id;
      realname = name.toLowerCase();
      $('#content').append(templ({
        title: 'Edit',
        id: id,
        button: 'Save'
      }));
      edit = editor.create("" + id + "-edit-view", {
        mode: "javascript",
        wrap: 100,
        worker: false,
        value: $("#" + id + "-value").text()
      });
      $('#edit-modal').modal();
      $('#edit-modal').on('hidden', function() {
        edit.destroy();
        return $('#edit-modal').remove();
      });
      return $('#edit-button').click(function() {
        return server.collection({
          collection: realname,
          type: 'update',
          query: edit.getSession().getValue()
        }, function(err) {
          if (err != null) {
            return notify.error("Error saving document: " + err);
          }
          $('#edit-modal').modal('hide');
          notify.success("Document saved!");
          return window.location.hash = "#/collection/" + name;
        });
      });
    };
  });

}).call(this);
