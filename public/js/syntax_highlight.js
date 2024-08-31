const editor = CodeMirror.fromTextArea(
  document.getElementById("codeExam_codeLanguage"),
  {
    mode: "xml",
    lineNumbers: true,
    autoCloseTags: true,
  }
);
editor.save();
