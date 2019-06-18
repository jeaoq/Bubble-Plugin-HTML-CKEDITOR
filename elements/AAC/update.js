function(instance, properties, context) {
  	var textname = "ckeditor_"+properties.inital_element_number;
  	if(!instance.data.created){
      instance.data.created=true;
      var ckeditor_ele = $('<textarea id="'+textname+'" name="'+textname+'"></textarea>');
      instance.canvas.append(ckeditor_ele);
    }
    CKEDITOR.config.allowedContent = true;
    CKEDITOR.config.fullPage = (properties.is_full_page == 'yes' ? true  : false);

    setTimeout(function(){
        if ($("#"+textname).length > 0) {
          if (!CKEDITOR.instances[textname]) {
          	var editor = CKEDITOR.replace( textname);
          }else{
            var editor = CKEDITOR.instances[textname];
          }
          editor.setData((properties.initial_content !=null ? properties.initial_content : ''));
          instance.publishState('content',editor.getData());
          editor.on( 'change', function( evt ) {
            // getData() returns CKEditor's HTML content.
            instance.publishState('content',evt.editor.getData());
          });
        }
    }, 100);
}