import fs from 'fs';
import path from 'path';

const membersFile = path.join(process.cwd(), 'content/members.json');

export interface MemberProfile {
  name: string;
  avatar?: string;
  position?: 'left' | 'right';
}

export function getMemberProfile(id: string): MemberProfile | null {
  try {
    if (!fs.existsSync(membersFile)) {
      return null;
    }
    const fileContents = fs.readFileSync(membersFile, 'utf8');
    const members = JSON.parse(fileContents);
    return members[id] || null;
  } catch (error) {
    console.error('Error reading members.json:', error);
    return null;
  }
}
