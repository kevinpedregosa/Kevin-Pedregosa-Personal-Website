/*************************************************************************
 * Lean custom.js for Portfolio
 *************************************************************************/
(function () {
  "use strict";

  var widgets;

  /**
   * Create HTML for a masonry/project card item
   */
  function createMasonryItemHTML(caption, imageSrc, credit) {
    var html = '<figure style="display: none;">';
    if (edaplotjs.Util.isFirefox()) {
      html = '<figure style="display: inline-flex">';
    }

    var figCaption = caption ? '<figcaption>' + caption + '</figcaption>' : "";
    var figCredit = credit ? '<div>' + credit + '</div>' : "";
    var figImage = imageSrc ? '<img src="' + imageSrc + '">' : "";

    html += figImage + figCredit + figCaption + '</figure>';

    var $html = $(html);
    $html.find("img").one("load", function () {
      $(this).parent().show();
    });

    return $html;
  }

  /**
   * Populate the masonry/project grid
   */
  function createMasonry() {
    var data = [
      {
        src: 'img/project1.png',
        credit: 'Project 1',
        caption: 'Example Project Card 1'
      },
      {
        src: 'img/project2.png',
        credit: 'Project 2',
        caption: 'Example Project Card 2'
      }
      // Add more projects here...
    ];

    var $container = $("#masonry");
    data.forEach(function (v, i) {
      var $item = createMasonryItemHTML(v.caption, v.src, v.credit);
      $container.append($item);
    });
  }

  /**
   * Optional: Share button dialog
   */
  function createShareButtonAndDialog() {
    var $sharePrompt = $("#share-url-copy-prompt");

    var $shareDialog = widgets.createCustomDialog({
      selector: "#share-dialog",
      full_width_button: true,
      action_text: "Copy to clipboard",
      close_dialog_on_action: false,
      show_cancel_btn: false,
      action_callback: function () {
        widgets.copyText("share-url");
        $sharePrompt.show();
      }
    });

    $shareDialog.on("dialogclose", function () {
      $sharePrompt.hide();
    });

    $("#share-btn").on("click", function () {
      $shareDialog.dialog("open");
    });
  }

  /**
   * Initialize everything
   */
  function init() {
    widgets = new edaplotjs.Widgets();

    // Create masonry/project cards
    createMasonry();

    // Create basic gallery (static)
    var $gallery = $("#gallery");
    for (var i = 0; i < 8; i++) {
      var item = '<a href="javascript:void(0)" class="flex-column">' +
        '<img src="img/dummay-img.png">' +
        '<div>Image Caption</div>' +
        '</a>';
      $gallery.append($(item));
    }

    // Optional: tabs/legend if used
    widgets.createCustomTab({ selector: "#custom-tab" });
    widgets.setCustomLegend($("#custom-legend"));

    // Optional: share button
    if ($("#share-btn").length) {
      createShareButtonAndDialog();
    }
  }

  $(init);
})();