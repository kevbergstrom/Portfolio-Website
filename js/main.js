skillRankings = {
    "PYTHON":0.7,
    "JAVA":0.6,
    "C":0.5,
    "JAVASCRIPT":0.4,
    "HTML":0.3,
}

function onStart(){
    /* load in all of the skill ranking into the html */
    Object.entries(skillRankings).forEach(([key, val]) => {
        generateSkillDisplay(key, val);
    });
}

function generateSkillDisplay(skillName, skillValue){

    var skillCont = $("#skillCont");

    /* there must be a better way to instance preset divs */
    var newSkill = '<div class="skillBox">';
    var skillBar = '<div class="rectHolder">';

    /* adding skillbar */
    newSkill += skillBar;
    newSkill += '<div class="skillBar" style="width:' + String(skillValue*100) + '%"><div>' + skillName + '</div></div>';

    /* closing the divs*/
    newSkill += '</div></div>';

    /* insert the newSkill into the html */
    skillCont.append(newSkill);
}

$(document).ready(function() {
    onStart()
  });