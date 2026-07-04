export function addTeamNote(p,note){return{...p,teamNotes:[...(p.teamNotes||[]),{...note,time:new Date().toISOString()}].slice(-1000)}}export function getTeamNotes(p){return p.teamNotes||[];}
