<!-- Bootstrap core JavaScript-->
<script src="dashboard/vendor/jquery/jquery.min.js"></script>
<script src="dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="dashboard/vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="dashboard/js/sb-admin-2.min.js"></script>

<script src="dashboard/vendor/chart.js/Chart.min.js"></script>

<!-- Page level custom scripts -->
<script src="dashboard/js/demo/chart-area-demo.js"></script>
<script src="dashboard/js/demo/chart-pie-demo.js"></script>

<script src="dashboard/vendor/datatables/jquery.dataTables.min.js"></script>
<script src="dashboard/vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- Page level custom scripts -->
<script src="dashboard/js/demo/datatables-demo.js"></script>
<script>
    function showSelectedAvatars(id) {
        const checkBox = document.getElementById(id);
        const selectedAvatar = document.getElementById('current-' + id + '-container');
        const selectedAvatarLabel = document.getElementById('current-avatar-label');

        if (checkBox.checked) {
            selectedAvatar.style.display = 'block';
            selectedAvatarLabel.style.display = 'block';
        } else {
            selectedAvatar.style.display = 'none';
        }
    }

    // const selectedAvatar = document.getElementById('selected-avatar-1');
    // selectedAvatar.style.display = 'none';
</script>
