(function($) {
    $(function() {
        var maxRateSlider = createSlider();

        $("#videoOptionsModal").on("hide.bs.modal", function() {
            var resolution = $("#resolution").val() || '480p';
            var maxFrameRate = $("#maxFrameRate").val() || 15;
            //var maxBitRate = maxRateSlider.slider("getValue") || 750;

            Cookies.set("resolution", resolution);
            Cookies.set("maxFrameRate", maxFrameRate);
            //Cookies.set("maxBitRate", maxBitRate);
        });

        $("#join-meeting").click(function(e) {
            e.preventDefault();
            var roomName = $("#room-name").val(),
                vendorKey = $("#vendor-key").val();

            if (!vendorKey) {
                $("#vendor-key").addClass("required-field");
            }

            if (!roomName) {
                $("#room-name").addClass("required-field");
            }

            if (roomName && vendorKey) {
                Cookies.set("roomName", roomName);
                Cookies.set("vendorKey", vendorKey);
                window.location.href="meeting.html";
            }
        });

        function bitRateRangeByResolution(reso) {
            var result;
            switch (reso) {
                case '120p':
                    result = [20, 160];
                    break;
                case '240p':
                    result = [50, 400];
                    break;
                case '360p':
                    result = [100, 1600];
                    break;
                case '480p':
                    result = [125, 2000];
                    break;
                case '720p':
                    result = [250, 4000];
                    break;
                case '1080p':
                    result = [375, 6000];
                    break;
                default:
                    result = [125, 2000];
            }
            return result;
        }
    });
}(jQuery));
