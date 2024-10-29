function toggleReport(reportId) {
    const report = document.getElementById(reportId);
    if (report.style.display === "none") {
        report.style.display = "block";
    } else {
        report.style.display = "none";
    }
}

function hideReport(reportId) {
    document.getElementById(reportId).style.display = "none";
}
