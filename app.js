/**
 * IMPERIVM — Academy of Conquerors
 * Gamified Classroom Assignment Engine & Mutual Real-time Leaderboard
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONQUEROR PERSONAS & CONFIGURATION
  // =========================================================================

  const CONQUERORS = {
    napoleon: {
      id: 'napoleon',
      name: 'Napoleon Bonaparte',
      title: 'Emperor of the French',
      virtue: 'Precision & Strategic Calculation',
      realm: 'The Grand Army Cohort',
      quote: '“Impossible is a word to be found only in the dictionary of fools.”',
      portrait: 'assets/napoleon.jpg',
      emblem: '🦅',
      glyph: 'N'
    },
    alexander: {
      id: 'alexander',
      name: 'Alexander the Great',
      title: 'Basileus of Macedon',
      virtue: 'Audacity & Unstoppable Will',
      realm: 'Macedonian Phalanx Cohort',
      quote: '“There is nothing impossible to him who will try.”',
      portrait: 'assets/alexander.jpg',
      emblem: '☀️',
      glyph: 'Α'
    },
    caesar: {
      id: 'caesar',
      name: 'Julius Caesar',
      title: 'Dictator Perpetuo',
      virtue: 'Oratory & Decisive Action',
      realm: 'Legions of the SPQR',
      quote: '“Veni, Vidi, Vici — I came, I saw, I conquered.”',
      portrait: 'assets/caesar.jpg',
      emblem: '🏛️',
      glyph: 'C'
    },
    hannibal: {
      id: 'hannibal',
      name: 'Hannibal Barca',
      title: 'Lion of Carthage',
      virtue: 'Tactical Ingenuity & Grit',
      realm: 'The Punic Cohort',
      quote: '“We will either find a way, or make one.”',
      portrait: 'assets/hannibal.jpg',
      emblem: '🐘',
      glyph: 'H'
    },
    genghis: {
      id: 'genghis',
      name: 'Genghis Khan',
      title: 'Universal Khagan',
      virtue: 'Iron Discipline & Focus',
      realm: 'The Steppe Vanguard',
      quote: '“Conquering on horseback is easy; it is dismounting and governing that is hard.”',
      portrait: 'assets/genghis.jpg',
      emblem: '🏹',
      glyph: 'G'
    },
    qin: {
      id: 'qin',
      name: 'Qin Shi Huang',
      title: 'First Emperor of Unified China',
      virtue: 'Legalism, Iron Will & Monumental Unification',
      realm: 'The Qin Terracotta Legions',
      quote: '“I have collected all the writings of the Empire and burned those which were of no use. One writing system, one currency, one realm.”',
      portrait: 'assets/qin.jpg',
      emblem: '🐉',
      glyph: '秦'
    },
    augustus: {
      id: 'augustus',
      name: 'Augustus Caesar',
      title: 'First Emperor of Rome & Imperator Princeps',
      virtue: 'Pax Romana, Civic Harmony & Golden Age',
      realm: 'The Praetorian Imperial Guard',
      quote: '“I found Rome a city of bricks and left it a city of marble.”',
      portrait: 'assets/augustus.jpg',
      emblem: '🦅',
      glyph: 'AVG'
    }
  };

  const RANK_TIERS = [
    { minPoints: 1000, title: 'Supreme Imperator' },
    { minPoints: 650, title: 'Legatus Legionis' },
    { minPoints: 350, title: 'Tribune' },
    { minPoints: 150, title: 'Centurion' },
    { minPoints: 0, title: 'Cadet' }
  ];

  function getRankTitle(points) {
    const tier = RANK_TIERS.find(t => points >= t.minPoints);
    return tier ? tier.title : 'Cadet';
  }

  // Standard Academic Subjects Mapping
  const SUBJECTS = {
    beee: { id: 'beee', code: 'BEEE', label: 'Basic Electrical & Electronics Engineering', short: '⚡ BEEE', color: '#f59e0b' },
    spa: { id: 'spa', code: 'SPA', label: 'Structured Programming Approach', short: '💻 SPA', color: '#06b6d4' },
    pmd: { id: 'pmd', code: 'PMD', label: 'Principles of Management & Design', short: '📐 PMD', color: '#8b5cf6' },
    comm: { id: 'comm', code: 'Comm Skills', label: 'Communication Skills', short: '🗣️ Comm Skills', color: '#10b981' },
    maths1: { id: 'maths1', code: 'Maths 1', label: 'Engineering Mathematics I', short: '∫ Maths 1', color: '#3b82f6' },
    maths2: { id: 'maths2', code: 'Maths 2', label: 'Engineering Mathematics II', short: '∬ Maths 2', color: '#6366f1' },
    iks: { id: 'iks', code: 'IKS', label: 'Indian Knowledge Systems', short: '📜 IKS', color: '#ec4899' },
    general: { id: 'general', code: 'General', label: 'General / Self-Study', short: '⚔️ General', color: '#c9a050' }
  };

  // Pre-configured default classroom assignments (Clean Slate for Deployment)
  const INITIAL_CLASS_ASSIGNMENTS = [];

  // Cohort Roster starts clean — only real registered cadets duel on the live leaderboard!
  const INITIAL_COHORT_ROSTER = [];

  function getRelativeDate(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  }

  // =========================================================================
  // 2. SYNTHESIZED WEB AUDIO ENGINE (ZERO EXTERNAL ASSETS)
  // =========================================================================

  class WebAudioEngine {
    constructor() {
      this.ctx = null;
      this.sfxEnabled = true;
      this.ambientEnabled = false;
      this.ambientInterval = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Steel Blade Clash
    playSteelClash() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.3);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      const ringOsc = this.ctx.createOscillator();
      const ringGain = this.ctx.createGain();
      ringOsc.type = 'sine';
      ringOsc.frequency.setValueAtTime(2400, now);
      ringOsc.frequency.exponentialRampToValueAtTime(2100, now + 0.5);

      ringGain.gain.setValueAtTime(0.2, now);
      ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      ringOsc.connect(ringGain);
      ringGain.connect(this.ctx.destination);

      osc.start(now);
      ringOsc.start(now);
      osc.stop(now + 0.4);
      ringOsc.stop(now + 0.65);
    }

    // Royal Fanfare
    playFanfare() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const notes = [
        { f: 293.66, t: 0, d: 0.14 },
        { f: 369.99, t: 0.16, d: 0.14 },
        { f: 440.00, t: 0.32, d: 0.2 },
        { f: 587.33, t: 0.54, d: 0.45 }
      ];

      const start = this.ctx.currentTime;
      notes.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, start + note.t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, start + note.t);

        gain.gain.setValueAtTime(0, start + note.t);
        gain.gain.linearRampToValueAtTime(0.22, start + note.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.t + note.d);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start + note.t);
        osc.stop(start + note.t + note.d);
      });
    }

    // War Drum Roll
    playWarDrum() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    // Quill pen scribing sound
    playQuill() {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.linearRampToValueAtTime(2200, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }

    // Ambient war tent campfire crackle
    toggleCampfire(state) {
      this.ambientEnabled = state;
      if (!this.ambientEnabled) {
        if (this.ambientInterval) clearInterval(this.ambientInterval);
        return;
      }

      this.init();
      if (!this.ctx) return;

      this.ambientInterval = setInterval(() => {
        if (!this.ambientEnabled || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90 + Math.random() * 300, now);
        gain.gain.setValueAtTime(0.03 + Math.random() * 0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }, 260);
    }
  }

  // =========================================================================
  // 3. REPOSITORY & MUTUAL REAL-TIME SYNCHRONIZATION
  // =========================================================================

  class ImperiumCohortStore {
    constructor() {
      this.currentUser = null;
      this.cohortRoster = [];
      this.classAssignments = [];
      this.personalDirectives = [];
      this.activeTab = 'class'; // 'class' | 'personal'
      this.activeMode = 'student'; // 'student' | 'admin'
      this.searchQuery = '';
      this.subjectFilter = 'all';
      this.statusFilter = 'pending'; // 'all' | 'pending' | 'completed'

      // Hard reset website and purge all existing users for deployment
      const RESET_STAMP = 'imperivm_deploy_clean_v8';
      if (typeof localStorage !== 'undefined' && localStorage.getItem(RESET_STAMP) !== 'true') {
        localStorage.removeItem('imperivm_active_user');
        localStorage.removeItem('imperivm_cohort_roster');
        localStorage.removeItem('imperivm_class_assignments');
        localStorage.removeItem('imperivm_personal_directives');
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.clear();
        }
        localStorage.setItem('imperivm_admin_passkey', 'NaughtyAlakhpandey');
        localStorage.setItem(RESET_STAMP, 'true');
      }

      // Admin security clearance passkey (Default: NaughtyAlakhpandey)
      this.adminPasskey = 'NaughtyAlakhpandey';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('imperivm_admin_passkey', 'NaughtyAlakhpandey');
      }
      this.isAdminUnlocked = false;

      // Real-time multi-tab communication channel
      this.channel = typeof BroadcastChannel !== 'undefined'
        ? new BroadcastChannel('imperivm_cohort_channel')
        : null;

      this.load();
      this.bindSync();
    }

    load() {
      try {
        // Load Cohort Roster (Peers + active student) - ZERO FAKE BOTS
        const savedRoster = localStorage.getItem('imperivm_cohort_roster');
        if (savedRoster) {
          const parsed = JSON.parse(savedRoster);
          this.cohortRoster = parsed.filter(u =>
            !['stud_octavian', 'stud_ney', 'stud_ptolemy', 'stud_hasdrubal', 'stud_livia', 'stud_chen', 'stud_marcus', 'stud_sophie', 'stud_rohan'].includes(u.id)
          );
        } else {
          this.cohortRoster = [];
        }

        // Resolve Active User Profile (Respects session tab isolation for mutual testing)
        let sessionUserId = null;
        if (typeof sessionStorage !== 'undefined') {
          sessionUserId = sessionStorage.getItem('imperivm_session_user_id');
        }

        if (sessionUserId) {
          this.currentUser = this.cohortRoster.find(u => u.id === sessionUserId) || null;
        }

        if (!this.currentUser) {
          const savedUser = localStorage.getItem('imperivm_active_user');
          if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            if (this.currentUser && typeof sessionStorage !== 'undefined') {
              sessionStorage.setItem('imperivm_session_user_id', this.currentUser.id);
            }
          }
        }

        // If active user exists, ensure they are present in cohort roster
        if (this.currentUser) {
          const existingIdx = this.cohortRoster.findIndex(u => u.id === this.currentUser.id);
          if (existingIdx >= 0) {
            this.currentUser = { ...this.cohortRoster[existingIdx] };
          } else {
            this.cohortRoster.push({ ...this.currentUser });
          }
        }
        localStorage.setItem('imperivm_cohort_roster', JSON.stringify(this.cohortRoster));

        // Load Class Assignments (Shared across cohort)
        const savedAssignments = localStorage.getItem('imperivm_class_assignments');
        if (savedAssignments) {
          this.classAssignments = JSON.parse(savedAssignments);
        } else {
          this.classAssignments = [...INITIAL_CLASS_ASSIGNMENTS];
          localStorage.setItem('imperivm_class_assignments', JSON.stringify(this.classAssignments));
        }

        // Load Personal Directives (Zero points)
        const savedPersonal = localStorage.getItem('imperivm_personal_directives');
        if (savedPersonal) {
          this.personalDirectives = JSON.parse(savedPersonal);
        } else {
          this.personalDirectives = [];
          localStorage.setItem('imperivm_personal_directives', JSON.stringify(this.personalDirectives));
        }
      } catch (err) {
        console.warn('Storage read warning:', err);
      }
    }

    save() {
      try {
        if (this.currentUser) {
          localStorage.setItem('imperivm_active_user', JSON.stringify(this.currentUser));
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('imperivm_session_user_id', this.currentUser.id);
          }
          // Update or add active user in the cohort roster
          const existingIdx = this.cohortRoster.findIndex(u => u.id === this.currentUser.id);
          if (existingIdx >= 0) {
            this.cohortRoster[existingIdx] = { ...this.currentUser };
          } else {
            this.cohortRoster.push({ ...this.currentUser });
          }
        }
        localStorage.setItem('imperivm_cohort_roster', JSON.stringify(this.cohortRoster));
        localStorage.setItem('imperivm_class_assignments', JSON.stringify(this.classAssignments));
        localStorage.setItem('imperivm_personal_directives', JSON.stringify(this.personalDirectives));
      } catch (err) {
        console.error('Storage save failed:', err);
      }
    }

    bindSync() {
      const handleSync = (payload) => {
        this.load();
        if (window.imperiumApp) {
          window.imperiumApp.renderLeaderboard();
          window.imperiumApp.renderAssignmentsFeed();
          window.imperiumApp.updateProfileWidget();
          window.imperiumApp.updateNextMissionSpotlight();
          if (payload) {
            window.imperiumApp.showToast(`Cohort update: ${payload}`);
          }
        }
      };

      if (this.channel) {
        this.channel.onmessage = (event) => {
          const { type, payload } = event.data || {};
          if (type === 'COHORT_UPDATE') {
            handleSync(payload);
          }
        };
      }

      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === 'imperivm_cohort_roster' || e.key === 'imperivm_class_assignments') {
            handleSync();
          }
        });
      }
    }

    broadcast(type, payload = '') {
      if (this.channel) {
        this.channel.postMessage({ type, payload });
      }
    }

    // Helper to find first available conqueror persona
    getAvailableCommander(preferredId, excludeUserId = null) {
      const keys = Object.keys(CONQUERORS);
      const claimedMap = new Map();
      this.cohortRoster.forEach(u => {
        if (u.commanderId && (!excludeUserId || u.id !== excludeUserId)) {
          claimedMap.set(u.commanderId, u.name);
        }
      });

      if (preferredId && !claimedMap.has(preferredId)) {
        return preferredId;
      }
      return keys.find(k => !claimedMap.has(k)) || keys[0];
    }

    // Set / Login Active User with Strict Avatar Exclusivity & Permanent Binding
    loginUser(name, commanderId, cohort = 'alpha', isGoogle = false, email = '') {
      const cleanName = (name || '').trim();
      if (!cleanName) {
        return { success: false, error: 'Cadet name cannot be empty.' };
      }

      const id = 'stud_' + cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const existing = this.cohortRoster.find(u => u.id === id);

      let finalCommanderId = commanderId;
      let avatarBoundNotice = '';

      if (existing) {
        // PERMANENCE RULE: Once chosen, an avatar CANNOT be changed!
        if (existing.commanderId) {
          finalCommanderId = existing.commanderId;
          if (commanderId && commanderId !== existing.commanderId) {
            avatarBoundNotice = `Your avatar remains permanently bound to ${CONQUERORS[existing.commanderId]?.name || existing.commanderId}.`;
          }
        } else {
          // EXCLUSIVITY RULE: 1 avatar cannot be chosen by 2 users at a time
          const claimedBy = this.cohortRoster.find(u => u.commanderId === commanderId && u.id !== id);
          if (claimedBy) {
            return {
              success: false,
              error: `${CONQUERORS[commanderId]?.name || 'This conqueror'} is already claimed by Cadet ${claimedBy.name}! In this cohort, each conqueror can only be pledged by one cadet.`
            };
          }
        }

        this.currentUser = {
          ...existing,
          commanderId: finalCommanderId,
          cohort: cohort || existing.cohort || 'alpha',
          isGoogle: isGoogle || existing.isGoogle,
          email: email || existing.email || ''
        };
      } else {
        // EXCLUSIVITY RULE: Check if commander is already claimed by another user
        const claimedBy = this.cohortRoster.find(u => u.commanderId === commanderId && u.id !== id);
        if (claimedBy) {
          return {
            success: false,
            error: `${CONQUERORS[commanderId]?.name || 'This conqueror'} has already been claimed by Cadet ${claimedBy.name}! In this cohort, each conqueror can only be chosen by one user at a time.`
          };
        }

        this.currentUser = {
          id,
          name: cleanName,
          commanderId: finalCommanderId,
          cohort,
          gloryPoints: 0,
          completedAssignmentIds: [],
          conquestStreak: 1,
          isGoogle,
          email
        };
      }

      this.save();
      this.broadcast('COHORT_UPDATE', `${this.currentUser.name} entered the cohort.`);
      return { success: true, user: this.currentUser, notice: avatarBoundNotice };
    }

    // Google Sign-In helper with available avatar fallback
    loginWithGoogle(email, name, commanderId = 'augustus') {
      const studentName = (name || email.split('@')[0]).trim();
      const id = 'stud_' + studentName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const existing = this.cohortRoster.find(u => u.id === id);

      let targetCmd = commanderId;
      if (!existing || !existing.commanderId) {
        targetCmd = this.getAvailableCommander(commanderId, id);
      }
      return this.loginUser(studentName, targetCmd, 'alpha', true, email);
    }

    // Admin Passkey Verification (Strict: NaughtyAlakhpandey)
    verifyAdminPasskey(entered) {
      if (!entered) return false;
      const cleanEntered = entered.trim();
      const valid = cleanEntered === this.adminPasskey ||
                    cleanEntered === 'NaughtyAlakhpandey';
      if (valid) {
        this.isAdminUnlocked = true;
      }
      return valid;
    }

    lockAdminConsole() {
      this.isAdminUnlocked = false;
    }

    // Student Toggles an Assignment
    toggleAssignment(assignmentId) {
      if (!this.currentUser) return;
      const assign = this.classAssignments.find(a => a.id === assignmentId);
      if (!assign) return;

      const completedSet = new Set(this.currentUser.completedAssignmentIds || []);
      const wasCompleted = completedSet.has(assignmentId);
      const oldPoints = this.currentUser.gloryPoints || 0;
      const oldRank = getRankTitle(oldPoints);

      if (wasCompleted) {
        completedSet.delete(assignmentId);
        this.currentUser.gloryPoints = Math.max(0, this.currentUser.gloryPoints - assign.points);
      } else {
        completedSet.add(assignmentId);
        this.currentUser.gloryPoints += assign.points;
      }

      const newPoints = this.currentUser.gloryPoints;
      const newRank = getRankTitle(newPoints);
      const isRankUp = !wasCompleted && (newRank !== oldRank);

      this.currentUser.completedAssignmentIds = Array.from(completedSet);
      this.save();
      this.broadcast('COHORT_UPDATE', `${this.currentUser.name} ${wasCompleted ? 'revoked' : 'conquered'} "${assign.title}"!`);

      return {
        completed: !wasCompleted,
        pointsAwarded: assign.points,
        title: assign.title,
        oldPoints,
        newPoints,
        isRankUp,
        oldRank,
        newRank
      };
    }

    // Admin decrees new class assignment with custom points
    adminAddAssignment(data) {
      const newAssign = {
        id: 'ca_' + Date.now(),
        title: data.title.trim(),
        subject: data.subject || 'beee',
        points: parseInt(data.points, 10) || 100,
        dueDate: data.dueDate,
        dueTime: data.dueTime || '23:59',
        instructions: data.instructions ? data.instructions.trim() : '',
        createdBy: 'admin',
        createdAt: Date.now()
      };

      this.classAssignments.unshift(newAssign);
      this.save();
      this.broadcast('COHORT_UPDATE', `New Assignment Decreed: ${newAssign.title}`);
      return newAssign;
    }

    adminDeleteAssignment(id) {
      const assign = this.classAssignments.find(a => a.id === id);
      const pointsToDeduct = assign ? (assign.points || 0) : 0;

      this.classAssignments = this.classAssignments.filter(a => a.id !== id);

      // Adjust completed assignment lists and points for cadets who completed it
      if (this.currentUser && this.currentUser.completedAssignmentIds) {
        if (this.currentUser.completedAssignmentIds.includes(id)) {
          this.currentUser.completedAssignmentIds = this.currentUser.completedAssignmentIds.filter(cid => cid !== id);
          this.currentUser.gloryPoints = Math.max(0, (this.currentUser.gloryPoints || 0) - pointsToDeduct);
        }
      }

      this.cohortRoster.forEach(u => {
        if (u.completedAssignmentIds && u.completedAssignmentIds.includes(id)) {
          u.completedAssignmentIds = u.completedAssignmentIds.filter(cid => cid !== id);
          u.gloryPoints = Math.max(0, (u.gloryPoints || 0) - pointsToDeduct);
        }
      });

      this.save();
      this.broadcast('COHORT_UPDATE', 'An assignment was archived by the Grand Marshal.');
    }

    // Admin full reset of tasks and points
    adminResetAll() {
      this.classAssignments = [];
      this.personalDirectives = [];
      this.cohortRoster.forEach(u => {
        u.gloryPoints = 0;
        u.completedAssignmentIds = [];
      });
      if (this.currentUser) {
        this.currentUser.gloryPoints = 0;
        this.currentUser.completedAssignmentIds = [];
      }
      this.save();
      this.broadcast('COHORT_UPDATE', 'Grand Marshal reset all points and assignments.');
    }

    // Student creates personal directive
    addPersonalDirective(data) {
      const item = {
        id: 'pd_' + Date.now(),
        title: data.title.trim(),
        subject: data.subject || 'general',
        dueDate: data.dueDate || '',
        notes: data.notes ? data.notes.trim() : '',
        completed: false,
        createdAt: Date.now()
      };
      this.personalDirectives.unshift(item);
      this.save();
      return item;
    }

    togglePersonalDirective(id) {
      const item = this.personalDirectives.find(p => p.id === id);
      if (item) {
        item.completed = !item.completed;
        this.save();
      }
      return item;
    }

    deletePersonalDirective(id) {
      this.personalDirectives = this.personalDirectives.filter(p => p.id !== id);
      this.save();
    }
  }

  // =========================================================================
  // 4. MAIN APP CONTROLLER & INTERFACE LOGIC
  // =========================================================================

  class ImperiumApp {
    constructor() {
      this.store = new ImperiumCohortStore();
      this.audio = new WebAudioEngine();

      this.cacheDom();
      this.bindEvents();
      this.initCanvasConfetti();

      // Check if user is logged in
      if (!this.store.currentUser) {
        this.openEnlistModal();
      } else {
        this.applyCharacterTheme(this.store.currentUser.commanderId);
      }

      this.render();
    }

    cacheDom() {
      this.dom = {
        html: document.documentElement,
        brandInsignia: document.getElementById('brandInsignia'),
        modeStudentBtn: document.getElementById('modeStudentBtn'),
        modeAdminBtn: document.getElementById('modeAdminBtn'),
        studentViewPanel: document.getElementById('studentViewPanel'),
        adminViewPanel: document.getElementById('adminViewPanel'),

        // Profile Widget
        widgetAvatarImg: document.getElementById('widgetAvatarImg'),
        widgetStudentName: document.getElementById('widgetStudentName'),
        widgetConquerorTag: document.getElementById('widgetConquerorTag'),
        widgetGloryPointsNum: document.getElementById('widgetGloryPointsNum'),
        widgetRankTitle: document.getElementById('widgetRankTitle'),
        openSwitchUserBtn: document.getElementById('openSwitchUserBtn'),

        // Audio controls
        sfxToggleBtn: document.getElementById('sfxToggleBtn'),
        sfxIcon: document.getElementById('sfxIcon'),
        ambientToggleBtn: document.getElementById('ambientToggleBtn'),
        ambientIcon: document.getElementById('ambientIcon'),
        shortcutsBtn: document.getElementById('shortcutsBtn'),

        // Spotlight & Next Objective
        spotlightPortraitImg: document.getElementById('spotlightPortraitImg'),
        spotlightBadge: document.getElementById('spotlightBadge'),
        spotlightRealmTitle: document.getElementById('spotlightRealmTitle'),
        spotlightHeading: document.getElementById('spotlightHeading'),
        spotlightQuote: document.getElementById('spotlightQuote'),
        metricGloryScore: document.getElementById('metricGloryScore'),
        metricRemainingClass: document.getElementById('metricRemainingClass'),
        metricRemainingPersonal: document.getElementById('metricRemainingPersonal'),
        metricLeaderboardRank: document.getElementById('metricLeaderboardRank'),
        metricStreak: document.getElementById('metricStreak'),
        spotlightNextTitle: document.getElementById('spotlightNextTitle'),
        spotlightNextDesc: document.getElementById('spotlightNextDesc'),
        spotlightConquerBtn: document.getElementById('spotlightConquerBtn'),

        // Feed & Controls
        tabClassAssignments: document.getElementById('tabClassAssignments'),
        tabPersonalDirectives: document.getElementById('tabPersonalDirectives'),
        classAssignmentsCount: document.getElementById('classAssignmentsCount'),
        personalDirectivesCount: document.getElementById('personalDirectivesCount'),
        proclaimPersonalBtn: document.getElementById('proclaimPersonalBtn'),
        assignmentSearchInput: document.getElementById('assignmentSearchInput'),
        searchClearBtn: document.getElementById('searchClearBtn'),
        subjectFilter: document.getElementById('subjectFilter'),
        completionStatusFilter: document.getElementById('completionStatusFilter'),
        assignmentsFeed: document.getElementById('assignmentsFeed'),
        feedEmptyState: document.getElementById('feedEmptyState'),

        // Leaderboard
        podiumGrid: document.getElementById('podiumGrid'),
        cohortTableBody: document.getElementById('cohortTableBody'),

        // Admin Console
        openNewAssignmentModalBtn: document.getElementById('openNewAssignmentModalBtn'),
        switchBackToStudentBtn: document.getElementById('switchBackToStudentBtn'),
        adminActiveCount: document.getElementById('adminActiveCount'),
        adminAssignmentsList: document.getElementById('adminAssignmentsList'),
        adminStudentsRoster: document.getElementById('adminStudentsRoster'),
        adminResetRosterBtn: document.getElementById('adminResetRosterBtn'),

        // Enlistment Modal
        enlistModal: document.getElementById('enlistModal'),
        enlistForm: document.getElementById('enlistForm'),
        enlistNameInput: document.getElementById('enlistNameInput'),
        enlistCohortSelect: document.getElementById('enlistCohortSelect'),
        characterSelectGrid: document.getElementById('characterSelectGrid'),
        closeEnlistBtn: document.getElementById('closeEnlistBtn'),
        enlistErrorBanner: document.getElementById('enlistErrorBanner'),

        // Admin Modal
        adminAssignmentModal: document.getElementById('adminAssignmentModal'),
        adminAssignmentForm: document.getElementById('adminAssignmentForm'),
        closeAdminModalBtn: document.getElementById('closeAdminModalBtn'),
        cancelAdminModalBtn: document.getElementById('cancelAdminModalBtn'),
        adminAssignTitle: document.getElementById('adminAssignTitle'),
        adminAssignSubject: document.getElementById('adminAssignSubject'),
        adminAssignPoints: document.getElementById('adminAssignPoints'),
        quickPointsChips: document.getElementById('quickPointsChips'),
        adminAssignDueDate: document.getElementById('adminAssignDueDate'),
        adminAssignDueTime: document.getElementById('adminAssignDueTime'),
        adminAssignInstructions: document.getElementById('adminAssignInstructions'),

        // Personal Directive Modal
        personalDirectiveModal: document.getElementById('personalDirectiveModal'),
        personalDirectiveForm: document.getElementById('personalDirectiveForm'),
        closePersonalModalBtn: document.getElementById('closePersonalModalBtn'),
        cancelPersonalModalBtn: document.getElementById('cancelPersonalModalBtn'),
        personalTitle: document.getElementById('personalTitle'),
        personalSubject: document.getElementById('personalSubject'),
        personalDueDate: document.getElementById('personalDueDate'),
        personalNotes: document.getElementById('personalNotes'),

        // Rank Promotion Triumph Modal
        promotionModal: document.getElementById('promotionModal'),
        promotionTitle: document.getElementById('promotionTitle'),
        promotionRankBadge: document.getElementById('promotionRankBadge'),
        promotionDesc: document.getElementById('promotionDesc'),
        promotionPointsEarned: document.getElementById('promotionPointsEarned'),
        closePromotionBtn: document.getElementById('closePromotionBtn'),
        claimPromotionBtn: document.getElementById('claimPromotionBtn'),

        // Confirm Conquer Modal
        confirmConquerModal: document.getElementById('confirmConquerModal'),
        closeConfirmConquerBtn: document.getElementById('closeConfirmConquerBtn'),
        cancelConfirmConquerBtn: document.getElementById('cancelConfirmConquerBtn'),
        executeConfirmConquerBtn: document.getElementById('executeConfirmConquerBtn'),
        confirmTaskSubject: document.getElementById('confirmTaskSubject'),
        confirmTaskPointsBadge: document.getElementById('confirmTaskPointsBadge'),
        confirmTaskTitle: document.getElementById('confirmTaskTitle'),
        confirmTaskRewardNotice: document.getElementById('confirmTaskRewardNotice'),

        // Google Auth Modal
        googleSignInBtn: document.getElementById('googleSignInBtn'),
        googleAuthModal: document.getElementById('googleAuthModal'),
        closeGoogleAuthBtn: document.getElementById('closeGoogleAuthBtn'),
        googleAccountsList: document.getElementById('googleAccountsList'),
        customGoogleForm: document.getElementById('customGoogleForm'),
        customGoogleEmail: document.getElementById('customGoogleEmail'),

        // Admin Passkey Modal
        adminPasskeyModal: document.getElementById('adminPasskeyModal'),
        adminPasskeyForm: document.getElementById('adminPasskeyForm'),
        adminPasskeyInput: document.getElementById('adminPasskeyInput'),
        closePasskeyModalBtn: document.getElementById('closePasskeyModalBtn'),
        cancelPasskeyBtn: document.getElementById('cancelPasskeyBtn'),
        togglePasskeyVisibilityBtn: document.getElementById('togglePasskeyVisibilityBtn'),
        passkeyErrorBanner: document.getElementById('passkeyErrorBanner'),
        lockAdminConsoleBtn: document.getElementById('lockAdminConsoleBtn'),
        adminResetAllDataBtn: document.getElementById('adminResetAllDataBtn'),

        // Shortcuts & Toast
        shortcutsModal: document.getElementById('shortcutsModal'),
        closeShortcutsBtn: document.getElementById('closeShortcutsBtn'),
        appToast: document.getElementById('appToast'),
        toastMessage: document.getElementById('toastMessage'),
      };
    }

    bindEvents() {
      // Mode Switcher: Student vs Admin (Passkey protected!)
      this.dom.modeStudentBtn.addEventListener('click', () => this.switchMode('student'));
      this.dom.modeAdminBtn.addEventListener('click', () => {
        if (!this.store.isAdminUnlocked) {
          this.openPasskeyModal();
        } else {
          this.switchMode('admin');
        }
      });
      this.dom.switchBackToStudentBtn.addEventListener('click', () => {
        this.store.lockAdminConsole();
        this.switchMode('student');
        this.showToast('Grand Marshal Console Locked 🔒');
      });

      // Admin Passkey Clearance Events
      this.dom.closePasskeyModalBtn.addEventListener('click', () => this.closeModal(this.dom.adminPasskeyModal));
      this.dom.cancelPasskeyBtn.addEventListener('click', () => this.closeModal(this.dom.adminPasskeyModal));
      this.dom.togglePasskeyVisibilityBtn.addEventListener('click', () => {
        const inp = this.dom.adminPasskeyInput;
        inp.type = inp.type === 'password' ? 'text' : 'password';
      });

      this.dom.adminPasskeyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = this.dom.adminPasskeyInput.value;
        if (this.store.verifyAdminPasskey(entered)) {
          this.dom.passkeyErrorBanner.hidden = true;
          this.closeModal(this.dom.adminPasskeyModal);
          this.switchMode('admin');
          this.audio.playFanfare();
          this.showToast('Grand Marshal Clearance Approved 🔓');
        } else {
          this.dom.passkeyErrorBanner.hidden = false;
          this.audio.playWarDrum();
        }
      });

      if (this.dom.lockAdminConsoleBtn) {
        this.dom.lockAdminConsoleBtn.addEventListener('click', () => {
          this.store.lockAdminConsole();
          this.switchMode('student');
          this.showToast('Grand Marshal Console Locked 🔒');
        });
      }

      if (this.dom.adminResetAllDataBtn) {
        this.dom.adminResetAllDataBtn.addEventListener('click', () => {
          if (confirm('WAR COUNCIL DECREE: Are you certain you want to purge all assignments and reset all cadet scores to 0? This action is irreversible.')) {
            this.store.adminResetAll();
            this.audio.playWarDrum();
            this.showToast('All assignments and scores have been wiped clean.');
            this.renderAdminView();
            this.render();
          }
        });
      }

      // Google Sign-In Events
      if (this.dom.googleSignInBtn) {
        this.dom.googleSignInBtn.addEventListener('click', () => {
          this.openModal(this.dom.googleAuthModal);
        });
      }

      if (this.dom.closeGoogleAuthBtn) {
        this.dom.closeGoogleAuthBtn.addEventListener('click', () => {
          this.closeModal(this.dom.googleAuthModal);
        });
      }

      if (this.dom.googleAccountsList) {
        this.dom.googleAccountsList.addEventListener('click', (e) => {
          const item = e.target.closest('.google-account-item');
          if (item) {
            const email = item.dataset.email;
            const name = item.dataset.name;
            const activeCard = this.dom.characterSelectGrid.querySelector('.character-card.active:not(.claimed)');
            const cmd = activeCard ? activeCard.dataset.cmd : null;
            const res = this.store.loginWithGoogle(email, name, cmd);

            if (!res.success) {
              this.audio.playWarDrum();
              if (this.dom.enlistErrorBanner) {
                this.dom.enlistErrorBanner.textContent = res.error;
                this.dom.enlistErrorBanner.hidden = false;
              }
              this.refreshCharacterCardsAvailability();
              this.closeModal(this.dom.googleAuthModal);
              return;
            }

            this.applyCharacterTheme(res.user.commanderId);
            this.audio.playFanfare();
            if (res.notice) {
              this.showToast(`Signed in with Google as ${name}! ${res.notice}`);
            } else {
              this.showToast(`Signed in with Google as ${name}!`);
            }
            this.closeModal(this.dom.googleAuthModal);
            this.closeModal(this.dom.enlistModal);
            this.render();
          }
        });
      }

      if (this.dom.customGoogleForm) {
        this.dom.customGoogleForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = this.dom.customGoogleEmail.value.trim();
          if (!email) return;
          const name = email.split('@')[0];
          const activeCard = this.dom.characterSelectGrid.querySelector('.character-card.active:not(.claimed)');
          const cmd = activeCard ? activeCard.dataset.cmd : null;
          const res = this.store.loginWithGoogle(email, name, cmd);

          if (!res.success) {
            this.audio.playWarDrum();
            if (this.dom.enlistErrorBanner) {
              this.dom.enlistErrorBanner.textContent = res.error;
              this.dom.enlistErrorBanner.hidden = false;
            }
            this.refreshCharacterCardsAvailability();
            this.closeModal(this.dom.googleAuthModal);
            return;
          }

          this.applyCharacterTheme(res.user.commanderId);
          this.audio.playFanfare();
          if (res.notice) {
            this.showToast(`Signed in with Google as ${email}! ${res.notice}`);
          } else {
            this.showToast(`Signed in with Google as ${email}!`);
          }
          this.closeModal(this.dom.googleAuthModal);
          this.closeModal(this.dom.enlistModal);
          this.render();
        });
      }

      // Switch User / Enlist Modal
      this.dom.openSwitchUserBtn.addEventListener('click', () => this.openEnlistModal());
      this.dom.closeEnlistBtn.addEventListener('click', () => {
        // Only allow closing if user is already logged in
        if (this.store.currentUser) {
          this.closeModal(this.dom.enlistModal);
        }
      });

      // Character Card Selection in Enlist Modal (Exclusive: 1 User per Conqueror)
      this.dom.characterSelectGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.character-card');
        if (!card) return;

        const cmd = card.dataset.cmd;
        const currentUserId = this.store.currentUser ? this.store.currentUser.id : null;
        const claimedUser = this.store.cohortRoster.find(u =>
          u.commanderId === cmd && (!currentUserId || u.id !== currentUserId)
        );

        if (claimedUser || card.classList.contains('claimed')) {
          this.audio.playWarDrum();
          const conquerorName = CONQUERORS[cmd] ? CONQUERORS[cmd].name : cmd;
          const claimedByName = claimedUser ? claimedUser.name : 'another cadet';
          if (this.dom.enlistErrorBanner) {
            this.dom.enlistErrorBanner.textContent = `⚔️ ${conquerorName} has already been claimed by Cadet ${claimedByName}! In this cohort, each conqueror can only be chosen by one user at a time.`;
            this.dom.enlistErrorBanner.hidden = false;
          }
          this.showToast(`${conquerorName} is claimed by Cadet ${claimedByName}. Pick an available persona!`);
          return;
        }

        if (this.dom.enlistErrorBanner) {
          this.dom.enlistErrorBanner.hidden = true;
          this.dom.enlistErrorBanner.textContent = '';
        }
        document.querySelectorAll('.character-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.audio.playQuill();
      });

      // Enlist Form Submission (Permanent Binding & Exclusivity Validation)
      this.dom.enlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = this.dom.enlistNameInput.value.trim();
        const cohort = this.dom.enlistCohortSelect.value;
        const activeCharCard = this.dom.characterSelectGrid.querySelector('.character-card.active:not(.claimed)');

        if (!name) {
          if (this.dom.enlistErrorBanner) {
            this.dom.enlistErrorBanner.textContent = 'Please enter your Cadet name to enlist.';
            this.dom.enlistErrorBanner.hidden = false;
          }
          return;
        }

        if (!activeCharCard) {
          this.audio.playWarDrum();
          if (this.dom.enlistErrorBanner) {
            this.dom.enlistErrorBanner.textContent = 'Please select an available conqueror persona! Claimed conquerors are unavailable.';
            this.dom.enlistErrorBanner.hidden = false;
          }
          return;
        }

        const cmd = activeCharCard.dataset.cmd;
        const res = this.store.loginUser(name, cmd, cohort);

        if (!res.success) {
          this.audio.playWarDrum();
          if (this.dom.enlistErrorBanner) {
            this.dom.enlistErrorBanner.textContent = res.error;
            this.dom.enlistErrorBanner.hidden = false;
          }
          this.refreshCharacterCardsAvailability();
          return;
        }

        this.applyCharacterTheme(res.user.commanderId);
        this.audio.playFanfare();
        if (res.notice) {
          this.showToast(`Welcome back, Cadet ${name}! ${res.notice}`);
        } else {
          this.showToast(`Welcome to the cohort, Cadet ${name}!`);
        }
        this.closeModal(this.dom.enlistModal);
        this.render();
      });

      // Audio Controls
      this.dom.sfxToggleBtn.addEventListener('click', () => {
        this.audio.sfxEnabled = !this.audio.sfxEnabled;
        this.dom.sfxIcon.textContent = this.audio.sfxEnabled ? '🔊' : '🔇';
        this.dom.sfxToggleBtn.classList.toggle('active', this.audio.sfxEnabled);
        this.showToast(this.audio.sfxEnabled ? 'Audio Activated' : 'Audio Muted');
        if (this.audio.sfxEnabled) this.audio.playQuill();
      });

      this.dom.ambientToggleBtn.addEventListener('click', () => {
        const next = !this.audio.ambientEnabled;
        this.audio.toggleCampfire(next);
        this.dom.ambientToggleBtn.classList.toggle('active', next);
        this.dom.ambientIcon.textContent = next ? '🔥' : '⛺';
        this.showToast(next ? 'War Council Campfire Kindled' : 'Campfire Extinguished');
      });

      // Shortcuts Modal
      this.dom.shortcutsBtn.addEventListener('click', () => this.openModal(this.dom.shortcutsModal));
      this.dom.closeShortcutsBtn.addEventListener('click', () => this.closeModal(this.dom.shortcutsModal));

      // Feed Tabs (Class vs Personal)
      this.dom.tabClassAssignments.addEventListener('click', () => {
        this.store.activeTab = 'class';
        this.dom.tabClassAssignments.classList.add('active');
        this.dom.tabPersonalDirectives.classList.remove('active');
        this.renderAssignmentsFeed();
      });

      this.dom.tabPersonalDirectives.addEventListener('click', () => {
        this.store.activeTab = 'personal';
        this.dom.tabPersonalDirectives.classList.add('active');
        this.dom.tabClassAssignments.classList.remove('active');
        this.renderAssignmentsFeed();
      });

      // Personal Directive Creation
      this.dom.proclaimPersonalBtn.addEventListener('click', () => this.openPersonalModal());
      this.dom.closePersonalModalBtn.addEventListener('click', () => this.closeModal(this.dom.personalDirectiveModal));
      this.dom.cancelPersonalModalBtn.addEventListener('click', () => this.closeModal(this.dom.personalDirectiveModal));

      this.dom.personalDirectiveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.dom.personalTitle.value.trim();
        if (!title) return;
        this.store.addPersonalDirective({
          title,
          subject: this.dom.personalSubject.value,
          dueDate: this.dom.personalDueDate.value,
          notes: this.dom.personalNotes.value
        });
        this.audio.playQuill();
        this.showToast('Personal Directive Recorded.');
        this.closeModal(this.dom.personalDirectiveModal);
        this.render();
      });

      // Search & Filters
      this.dom.assignmentSearchInput.addEventListener('input', (e) => {
        this.store.searchQuery = e.target.value.toLowerCase().trim();
        this.dom.searchClearBtn.hidden = !this.store.searchQuery;
        this.renderAssignmentsFeed();
      });

      this.dom.searchClearBtn.addEventListener('click', () => {
        this.dom.assignmentSearchInput.value = '';
        this.store.searchQuery = '';
        this.dom.searchClearBtn.hidden = true;
        this.renderAssignmentsFeed();
      });

      this.dom.subjectFilter.addEventListener('change', (e) => {
        this.store.subjectFilter = e.target.value;
        this.renderAssignmentsFeed();
      });

      this.dom.completionStatusFilter.addEventListener('change', (e) => {
        this.store.statusFilter = e.target.value;
        this.renderAssignmentsFeed();
      });

      // Admin Assignment Publisher
      this.dom.openNewAssignmentModalBtn.addEventListener('click', () => this.openAdminModal());
      this.dom.closeAdminModalBtn.addEventListener('click', () => this.closeModal(this.dom.adminAssignmentModal));
      this.dom.cancelAdminModalBtn.addEventListener('click', () => this.closeModal(this.dom.adminAssignmentModal));

      this.dom.adminAssignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.dom.adminAssignTitle.value.trim();
        if (!title) return;
        this.store.adminAddAssignment({
          title,
          subject: this.dom.adminAssignSubject.value,
          points: this.dom.adminAssignPoints.value,
          dueDate: this.dom.adminAssignDueDate.value,
          dueTime: this.dom.adminAssignDueTime.value,
          instructions: this.dom.adminAssignInstructions.value
        });
        this.audio.playFanfare();
        this.showToast(`Assignment "${title}" Decreed to Cohort Feed!`);
        this.closeModal(this.dom.adminAssignmentModal);
        this.render();
      });

      this.dom.adminResetRosterBtn.addEventListener('click', () => {
        if (confirm('Clear enrolled cadets and restore base curriculum assignments?')) {
          localStorage.removeItem('imperivm_cohort_roster');
          localStorage.removeItem('imperivm_active_user');
          localStorage.removeItem('imperivm_class_assignments');
          localStorage.removeItem('imperivm_personal_directives');
          localStorage.setItem('imperivm_admin_passkey', 'NaughtyAlakhpandey');
          this.store = new ImperiumCohortStore();
          this.showToast('Ledger reset.');
          location.reload();
        }
      });

      // Custom Quick Points Chips in Admin Modal
      if (this.dom.quickPointsChips) {
        this.dom.quickPointsChips.addEventListener('click', (e) => {
          const btn = e.target.closest('.chip-pts');
          if (btn) {
            this.dom.adminAssignPoints.value = btn.dataset.pts;
            this.dom.quickPointsChips.querySelectorAll('.chip-pts').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      }

      // Spotlight Jump to Next Mission (Opens Reconfirmation Modal)
      if (this.dom.spotlightConquerBtn) {
        this.dom.spotlightConquerBtn.addEventListener('click', () => {
          const firstPending = this.store.classAssignments.find(a =>
            !this.store.currentUser || !this.store.currentUser.completedAssignmentIds.includes(a.id)
          );
          if (firstPending) {
            this.openConfirmConquerModal(firstPending.id, true);
          } else {
            this.showToast('All course missions completed! 👑');
          }
        });
      }

      // Promotion Triumph Modal Buttons
      if (this.dom.closePromotionBtn) {
        this.dom.closePromotionBtn.addEventListener('click', () => this.closeModal(this.dom.promotionModal));
      }
      if (this.dom.claimPromotionBtn) {
        this.dom.claimPromotionBtn.addEventListener('click', () => this.closeModal(this.dom.promotionModal));
      }

      // Reconfirm Conquered Modal Buttons
      if (this.dom.closeConfirmConquerBtn) {
        this.dom.closeConfirmConquerBtn.addEventListener('click', () => this.closeModal(this.dom.confirmConquerModal));
      }
      if (this.dom.cancelConfirmConquerBtn) {
        this.dom.cancelConfirmConquerBtn.addEventListener('click', () => this.closeModal(this.dom.confirmConquerModal));
      }
      if (this.dom.executeConfirmConquerBtn) {
        this.dom.executeConfirmConquerBtn.addEventListener('click', () => {
          if (!this.pendingConquer) return;
          const { taskId, isClassTab } = this.pendingConquer;
          this.closeModal(this.dom.confirmConquerModal);

          if (isClassTab) {
            const res = this.store.toggleAssignment(taskId);
            if (res && res.completed) {
              // 1. Instantly update the mutual leaderboard with real-time flash & score pop!
              this.renderLeaderboard(this.store.currentUser.id);
              this.updateProfileWidget();
              this.updateNextMissionSpotlight();

              const card = document.querySelector(`[data-assignment-id="${taskId}"]`);
              const btn = card ? card.querySelector('.btn-conquer-option') : null;
              this.triggerDopamineReward(card || document.body, btn, res.pointsAwarded, res.title, res.isRankUp, res.newRank);
              this.showToast(`👑 Conquered! +${res.pointsAwarded} Glory Points Added to Your Account! Leaderboard Updated.`);

              // 2. Smoothly update assignment list after dopamine animation
              setTimeout(() => {
                this.renderAssignmentsFeed();
              }, 400);
            } else {
              this.render();
            }
          } else {
            this.store.togglePersonalDirective(taskId);
            this.audio.playQuill();
            const card = document.querySelector(`[data-assignment-id="${taskId}"]`);
            if (card) {
              card.classList.add('conquering');
              setTimeout(() => card.classList.remove('conquering'), 500);
            }
            this.showToast('✓ Personal Directive Conquered!');
            this.render();
          }
          this.pendingConquer = null;
        });
      }

      // Global Keyboard Shortcuts
      document.addEventListener('keydown', (e) => {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
          if (e.key === 'Escape') e.target.blur();
          return;
        }

        if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          if (this.store.activeMode === 'student') {
            if (!this.store.isAdminUnlocked) {
              this.openPasskeyModal();
            } else {
              this.switchMode('admin');
            }
          } else {
            this.store.lockAdminConsole();
            this.switchMode('student');
            this.showToast('Grand Marshal Console Locked 🔒');
          }
        } else if (e.key === '/') {
          e.preventDefault();
          this.dom.assignmentSearchInput.focus();
        } else if (e.key === 'm' || e.key === 'M') {
          e.preventDefault();
          this.dom.sfxToggleBtn.click();
        } else if (e.key === 'Escape') {
          if (this.store.currentUser) {
            this.closeAllModals();
          } else {
            // First-time visitor must enlist: only dismiss auxiliary popups
            if (this.dom.googleAuthModal && !this.dom.googleAuthModal.hidden) {
              this.closeModal(this.dom.googleAuthModal);
            }
            if (this.dom.shortcutsModal && !this.dom.shortcutsModal.hidden) {
              this.closeModal(this.dom.shortcutsModal);
            }
          }
        }
      });
    }

    // =======================================================================
    // 5. VIEW & THEME LOGIC
    // =======================================================================

    switchMode(mode) {
      if (mode === 'student') {
        this.store.lockAdminConsole();
      }
      this.store.activeMode = mode;
      const isStudent = mode === 'student';

      this.dom.modeStudentBtn.classList.toggle('active', isStudent);
      this.dom.modeAdminBtn.classList.toggle('active', !isStudent);

      this.dom.studentViewPanel.hidden = !isStudent;
      this.dom.adminViewPanel.hidden = isStudent;

      if (!isStudent) {
        this.renderAdminView();
      } else {
        this.render();
      }
    }

    applyCharacterTheme(cmdId) {
      const cmd = CONQUERORS[cmdId] || CONQUERORS.napoleon;
      this.dom.html.setAttribute('data-commander', cmd.id);

      // Update Spotlight
      this.dom.spotlightPortraitImg.src = cmd.portrait;
      this.dom.spotlightBadge.textContent = cmd.name.split(' ')[0];
      this.dom.spotlightRealmTitle.textContent = cmd.realm;
      this.dom.spotlightHeading.textContent = cmd.name;
      this.dom.spotlightQuote.textContent = cmd.quote;
      this.dom.brandInsignia.textContent = cmd.emblem;

      // Update Profile Widget
      this.updateProfileWidget();
    }

    updateProfileWidget() {
      const user = this.store.currentUser;
      // Calculate remaining tasks for both assignments and personal directives
      const completedIds = new Set(user ? (user.completedAssignmentIds || []) : []);
      const remainingClass = this.store.classAssignments.filter(a => !completedIds.has(a.id)).length;
      const remainingPersonal = this.store.personalDirectives.filter(p => !p.completed).length;

      // Update Homepage Metric strip: ONLY SHOW REMAINING TASKS
      if (this.dom.metricRemainingClass) {
        this.dom.metricRemainingClass.textContent = `${remainingClass} Left`;
      }
      if (this.dom.metricRemainingPersonal) {
        this.dom.metricRemainingPersonal.textContent = `${remainingPersonal} Left`;
      }

      if (!user) return;

      const cmd = CONQUERORS[user.commanderId] || CONQUERORS.napoleon;
      this.dom.widgetAvatarImg.src = cmd.portrait;
      this.dom.widgetStudentName.innerHTML = `${this.escapeHtml(user.name)} ${user.isGoogle ? '<span class="google-verified-badge" title="Verified Google Account">✓</span>' : ''}`;
      this.dom.widgetConquerorTag.innerHTML = `${cmd.name.split(' ')[0]} <span class="persona-locked-badge" title="Avatar permanently bound to cadet">🔒 Bound</span>`;
      this.dom.widgetGloryPointsNum.textContent = user.gloryPoints;

      const rank = getRankTitle(user.gloryPoints);
      this.dom.widgetRankTitle.textContent = rank;

      this.dom.metricGloryScore.textContent = `${user.gloryPoints} CP`;
      this.dom.metricStreak.textContent = `${user.conquestStreak || 7} Days`;

      // Standing on leaderboard
      const sortedRoster = [...this.store.cohortRoster].sort((a, b) => b.gloryPoints - a.gloryPoints);
      const userRankIdx = sortedRoster.findIndex(u => u.id === user.id);
      const rankNum = userRankIdx >= 0 ? userRankIdx + 1 : 1;
      this.dom.metricLeaderboardRank.textContent = `#${rankNum} of ${sortedRoster.length}`;
    }

    // =======================================================================
    // 6. RENDER FEED & CARDS
    // =======================================================================

    render() {
      this.updateProfileWidget();
      this.renderAssignmentsFeed();
      this.renderLeaderboard();
      this.updateNextMissionSpotlight();
    }

    renderAssignmentsFeed() {
      const list = this.dom.assignmentsFeed;
      list.innerHTML = '';

      const isClassTab = this.store.activeTab === 'class';
      const completedIds = new Set(
        this.store.currentUser ? (this.store.currentUser.completedAssignmentIds || []) : []
      );

      // On homepage, only show remaining tasks
      const remainingClass = this.store.classAssignments.filter(a => !completedIds.has(a.id)).length;
      const remainingPersonal = this.store.personalDirectives.filter(p => !p.completed).length;

      if (this.dom.classAssignmentsCount) {
        this.dom.classAssignmentsCount.textContent = `${remainingClass} Left`;
      }
      if (this.dom.personalDirectivesCount) {
        this.dom.personalDirectivesCount.textContent = `${remainingPersonal} Left`;
      }

      let items = isClassTab ? [...this.store.classAssignments] : [...this.store.personalDirectives];

      // Search Query
      if (this.store.searchQuery) {
        const q = this.store.searchQuery;
        items = items.filter(i =>
          i.title.toLowerCase().includes(q) ||
          (i.instructions && i.instructions.toLowerCase().includes(q)) ||
          (i.notes && i.notes.toLowerCase().includes(q)) ||
          (i.subject && i.subject.toLowerCase().includes(q))
        );
      }

      // Subject Filter
      if (this.store.subjectFilter !== 'all') {
        items = items.filter(i => i.subject === this.store.subjectFilter);
      }

      // Completion Status Filter
      if (this.store.statusFilter === 'pending') {
        items = items.filter(i => isClassTab ? !completedIds.has(i.id) : !i.completed);
      } else if (this.store.statusFilter === 'completed') {
        items = items.filter(i => isClassTab ? completedIds.has(i.id) : i.completed);
      }

      // Empty State Check
      if (items.length === 0) {
        this.dom.feedEmptyState.hidden = false;
        const emptyTitle = this.dom.feedEmptyState.querySelector('.empty-title');
        const emptyDesc = this.dom.feedEmptyState.querySelector('.empty-desc');
        const emptyIcon = this.dom.feedEmptyState.querySelector('.empty-icon');

        if (isClassTab) {
          if (this.store.classAssignments.length === 0) {
            if (emptyIcon) emptyIcon.textContent = '📜';
            if (emptyTitle) emptyTitle.textContent = 'No Course Assignments Decreed';
            if (emptyDesc) emptyDesc.textContent = 'The Grand Marshal has not issued any assignments yet. Cadets can train via Personal Directives, or switch to Grand Marshal console (Admin with passkey "NaughtyAlakhpandey") to decree new missions.';
          } else {
            if (emptyIcon) emptyIcon.textContent = '👑';
            if (emptyTitle) emptyTitle.textContent = 'All Assignments Conquered!';
            if (emptyDesc) emptyDesc.textContent = 'Your cohort ledger is clear. Stand proud atop the leaderboard, Commander, or create a personal training directive.';
          }
        } else {
          if (this.store.personalDirectives.length === 0) {
            if (emptyIcon) emptyIcon.textContent = '📜';
            if (emptyTitle) emptyTitle.textContent = 'No Personal Directives';
            if (emptyDesc) emptyDesc.textContent = 'Your personal directive ledger is empty. Scribe a new self-study directive above.';
          } else {
            if (emptyIcon) emptyIcon.textContent = '✓';
            if (emptyTitle) emptyTitle.textContent = 'All Personal Directives Conquered';
            if (emptyDesc) emptyDesc.textContent = 'All personal directives completed for now.';
          }
        }
        return;
      }
      this.dom.feedEmptyState.hidden = true;

      // Render Items
      items.forEach(item => {
        const isDone = isClassTab ? completedIds.has(item.id) : item.completed;
        const card = document.createElement('li');
        card.className = `assignment-card ${isDone ? 'completed' : ''}`;
        card.dataset.subject = item.subject || 'general';
        card.dataset.assignmentId = item.id;

        const sub = SUBJECTS[item.subject] || { short: item.subject, code: item.subject };
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = !isDone && item.dueDate && item.dueDate < today;

        card.innerHTML = `
          <div class="assign-layout">
            <div class="assign-conquer-front">
              <button class="assign-checkbox-btn ${isDone ? 'conquered-pop' : ''}" title="${isDone ? 'Conquered (Click to revoke)' : 'Conquer & Claim Glory Points'}" aria-label="Toggle completion">
                <span class="seal-check-icon">👑</span>
              </button>
              <button type="button" class="btn-conquer-option ${isDone ? 'is-conquered' : ''}" title="${isDone ? 'Task is Conquered (Click to revoke)' : 'Conquer this task and claim points'}">
                ${isDone ? '<span class="cq-icon">✓</span> Conquered' : '<span class="cq-icon">⚔️</span> Conquer'}
              </button>
            </div>

            <div class="assign-body">
              <div class="assign-meta-row">
                <span class="badge-subject">${sub.short || sub.code || 'Course'}</span>
                ${isClassTab && item.points ? `<span class="badge-points">⚡ +${item.points} CP</span>` : ''}
                ${item.dueDate ? `<span class="badge-due-date ${isOverdue ? 'overdue' : ''}">
                  ${isOverdue ? '⚠️ Overdue' : 'Due'}: ${item.dueDate} ${item.dueTime || ''}
                </span>` : ''}
              </div>

              <div class="assign-title-row">
                <h4 class="assign-title">${this.escapeHtml(item.title)}</h4>
              </div>

              ${item.instructions ? `<div class="assign-instructions">“${this.escapeHtml(item.instructions)}”</div>` : ''}
              ${item.notes ? `<div class="assign-instructions">“${this.escapeHtml(item.notes)}”</div>` : ''}

              <div class="assign-actions-row">
                <span class="completion-status-text">
                  ${isDone ? (isClassTab ? `👑 Conquered by You • +${item.points || 0} CP Earned` : '✓ Directive Completed') : (isClassTab ? 'Pending Execution' : 'Personal Action Item')}
                </span>
                ${!isClassTab ? `<button class="btn-clean btn-del-personal" title="Delete Directive" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;">Delete</button>` : ''}
              </div>
            </div>
          </div>
        `;

        // Conquer Action (Reconfirms if task is over, and if yes adds points)
        const checkBtn = card.querySelector('.assign-checkbox-btn');
        const conquerBtn = card.querySelector('.btn-conquer-option');

        const triggerConquerAction = () => {
          if (!isDone) {
            // Task is not yet finished: Reconfirm whether it is over!
            this.openConfirmConquerModal(item.id, isClassTab);
          } else {
            // Task is already finished: prompt for revocation
            if (confirm(`Revoke conquered status for "${item.title}"? Points will be deducted from your account.`)) {
              if (isClassTab) {
                this.store.toggleAssignment(item.id);
                this.audio.playQuill();
                this.showToast('Assignment completion revoked. Points deducted.');
                this.renderLeaderboard(this.store.currentUser.id);
                this.updateProfileWidget();
                this.renderAssignmentsFeed();
                this.updateNextMissionSpotlight();
              } else {
                this.store.togglePersonalDirective(item.id);
                this.audio.playQuill();
                this.showToast('Directive marked pending.');
                this.render();
              }
            }
          }
        };

        checkBtn.addEventListener('click', triggerConquerAction);
        conquerBtn.addEventListener('click', triggerConquerAction);

        // Delete Personal Directive
        const delBtn = card.querySelector('.btn-del-personal');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.store.deletePersonalDirective(item.id);
            this.showToast('Directive removed.');
            this.render();
          });
        }

        list.appendChild(card);
      });
    }

    // =======================================================================
    // 7. RENDER LIVE MUTUAL LEADERBOARD
    // =======================================================================

    renderLeaderboard(updatedUserId = null) {
      // Sort cohort by glory points descending (Real Users Only)
      const roster = [...this.store.cohortRoster].sort((a, b) => b.gloryPoints - a.gloryPoints);

      // Render Top 3 Podium
      const podium = this.dom.podiumGrid;
      podium.innerHTML = '';

      const top3 = [
        roster[1] || null, // Rank 2 (Left)
        roster[0] || null, // Rank 1 (Center)
        roster[2] || null  // Rank 3 (Right)
      ];

      const rankOrder = [2, 1, 3];
      const crownIcons = ['🥈', '👑', '🥉'];

      top3.forEach((student, idx) => {
        const rankNum = rankOrder[idx];
        const card = document.createElement('div');

        if (student) {
          const cmd = CONQUERORS[student.commanderId] || CONQUERORS.napoleon;
          const isCurrent = this.store.currentUser && student.id === this.store.currentUser.id;
          const isJustUpdated = updatedUserId && student.id === updatedUserId;
          card.className = `podium-card rank-${rankNum} ${isCurrent ? 'is-active-user' : ''} ${isJustUpdated ? 'leaderboard-just-updated' : ''}`;
          card.innerHTML = `
            <span class="podium-crown">${crownIcons[idx]}</span>
            <img src="${cmd.portrait}" alt="${cmd.name}" class="podium-avatar" />
            <span class="podium-name">${this.escapeHtml(student.name)}</span>
            <span class="podium-cmd">${cmd.name.split(' ')[0]}</span>
            <span class="podium-score ${isJustUpdated ? 'score-tick-pop' : ''}">${student.gloryPoints} CP</span>
          `;
        } else {
          card.className = `podium-card rank-${rankNum} empty-contender`;
          card.innerHTML = `
            <span class="podium-crown">${crownIcons[idx]}</span>
            <div class="podium-avatar empty-avatar">⚔️</div>
            <span class="podium-name">Awaiting Rival</span>
            <span class="podium-cmd">Open Seat</span>
            <span class="podium-score">-- CP</span>
          `;
        }
        podium.appendChild(card);
      });

      // Render Full Cohort Table
      const tbody = this.dom.cohortTableBody;
      tbody.innerHTML = '';

      if (roster.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align: center; padding: 2rem 1rem; color: var(--text-dim);">
          No registered cadets yet. Enlist or sign in with Google to claim Rank #1!
        </td>`;
        tbody.appendChild(tr);
        return;
      }

      roster.forEach((student, idx) => {
        const cmd = CONQUERORS[student.commanderId] || CONQUERORS.napoleon;
        const isCurrent = this.store.currentUser && student.id === this.store.currentUser.id;
        const isJustUpdated = updatedUserId && student.id === updatedUserId;
        const rankNum = idx + 1;
        const completedCount = (student.completedAssignmentIds || []).length;

        const tr = document.createElement('tr');
        tr.className = `cohort-row ${isCurrent ? 'is-active-user' : ''} ${isJustUpdated ? 'leaderboard-just-updated' : ''}`;
        tr.innerHTML = `
          <td class="td-rank">#${rankNum}</td>
          <td>
            <div class="td-student-cell">
              <img src="${cmd.portrait}" alt="" class="table-avatar" />
              <div>
                <span class="student-name-td">${this.escapeHtml(student.name)} ${isCurrent ? '⭐ (You)' : ''}</span>
                <span style="display: block; font-size: 0.65rem; color: var(--text-dim);">${cmd.name.split(' ')[0]}</span>
              </div>
            </div>
          </td>
          <td class="td-done">${completedCount}</td>
          <td class="td-points ${isJustUpdated ? 'score-tick-pop' : ''}">${student.gloryPoints} CP</td>
        `;
        tbody.appendChild(tr);
      });

      // Live multiplayer notice when 1 student is competing
      const existingBanner = document.querySelector('.empty-cohort-banner');
      if (roster.length <= 1) {
        if (!existingBanner) {
          const banner = document.createElement('div');
          banner.className = 'empty-cohort-banner';
          banner.innerHTML = `
            <div class="empty-cohort-icon">⚔️</div>
            <div class="empty-cohort-title">Single Warrior Vanguard</div>
            <p class="empty-cohort-desc">No fake bots on this ledger! Open this site in another browser window or tab to simulate mutual peer competition in real time.</p>
          `;
          tbody.parentElement.parentElement.appendChild(banner);
        }
      } else {
        if (existingBanner) existingBanner.remove();
      }
    }

    // =======================================================================
    // 8. RENDER ADMIN VIEW
    // =======================================================================

    renderAdminView() {
      this.dom.adminActiveCount.textContent = `${this.store.classAssignments.length} Active`;

      // Render published assignments
      const assignList = this.dom.adminAssignmentsList;
      assignList.innerHTML = '';

      if (this.store.classAssignments.length === 0) {
        assignList.innerHTML = `<div style="text-align: center; padding: 2rem 1rem; color: var(--text-dim); font-size: 0.85rem; border: 1px dashed var(--slate-border); border-radius: var(--radius-xs);">
          No class assignments decreed yet. Click "+ Proclaim New Class Assignment" above to decree your first course mission.
        </div>`;
      } else {
        this.store.classAssignments.forEach(assign => {
          // Count how many cohort students completed this
          const completedCadetsCount = this.store.cohortRoster.filter(s =>
            (s.completedAssignmentIds || []).includes(assign.id)
          ).length;

          const item = document.createElement('div');
          item.className = 'admin-assign-item';
          item.innerHTML = `
            <div class="admin-assign-info">
              <span class="admin-assign-title">${this.escapeHtml(assign.title)}</span>
              <div class="admin-assign-meta">
                <span>Subject: ${assign.subject}</span>
                <span>Reward: +${assign.points} CP</span>
                <span>Due: ${assign.dueDate}</span>
                <span style="color: #10b981; font-weight: 600;">${completedCadetsCount}/${this.store.cohortRoster.length} Cadets Completed</span>
              </div>
            </div>
            <div class="admin-assign-ops">
              <button class="btn-clean btn-del-assign" title="Revoke assignment">Revoke</button>
            </div>
          `;

          item.querySelector('.btn-del-assign').addEventListener('click', () => {
            if (confirm(`Revoke assignment "${assign.title}" from cohort feed?`)) {
              this.store.adminDeleteAssignment(assign.id);
              this.showToast('Assignment revoked.');
              this.renderAdminView();
            }
          });

          assignList.appendChild(item);
        });
      }

      // Render enrolled students roster
      const rosterList = this.dom.adminStudentsRoster;
      rosterList.innerHTML = '';

      if (this.store.cohortRoster.length === 0) {
        rosterList.innerHTML = `<div style="text-align: center; padding: 2rem 1rem; color: var(--text-dim); font-size: 0.85rem; border: 1px dashed var(--slate-border); border-radius: var(--radius-xs);">
          No cadets registered yet. Enlist or sign in via student view to appear on the war roster.
        </div>`;
      } else {
        this.store.cohortRoster.forEach(student => {
          const cmd = CONQUERORS[student.commanderId] || CONQUERORS.napoleon;
          const row = document.createElement('div');
          row.className = 'admin-student-row';
          row.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <img src="${cmd.portrait}" style="width: 28px; height: 28px; border-radius: 4px; object-fit: cover;" alt="" />
              <div>
                <span class="admin-student-name">${this.escapeHtml(student.name)}</span>
                <span style="font-size: 0.68rem; color: var(--text-dim); display: block;">${cmd.name} • ${getRankTitle(student.gloryPoints)}</span>
              </div>
            </div>
            <div class="admin-student-stats">
              <span>${student.gloryPoints} CP</span> • <span>${(student.completedAssignmentIds || []).length} done</span>
            </div>
          `;
          rosterList.appendChild(row);
        });
      }
    }

    // =======================================================================
    // 9. GAMIFIED DOPAMINE REWARD ENGINE
    // =======================================================================

    triggerDopamineReward(cardEl, checkboxEl, pointsAwarded, title, isRankUp, newRank) {
      // 1. Blade clash + Fanfare
      this.audio.playSteelClash();
      setTimeout(() => this.audio.playFanfare(), 120);

      // 2. Card shockwave animation
      cardEl.classList.add('conquering');
      setTimeout(() => cardEl.classList.remove('conquering'), 750);

      // 3. Checkbox pop
      if (checkboxEl) {
        checkboxEl.classList.add('conquered-pop');
        setTimeout(() => checkboxEl.classList.remove('conquered-pop'), 600);
      }

      // 4. Floating XP Pill
      const rect = (checkboxEl || cardEl).getBoundingClientRect();
      const pill = document.createElement('div');
      pill.className = 'floating-xp-pill';
      pill.innerHTML = `<span>⚡ +${pointsAwarded} CP!</span> <span>👑</span>`;
      pill.style.left = `${rect.left + rect.width / 2}px`;
      pill.style.top = `${rect.top + window.scrollY}px`;
      document.body.appendChild(pill);
      setTimeout(() => pill.remove(), 1300);

      // 5. Points Pulse & Number ticker on widget
      this.animatePointsCounter(this.store.currentUser.gloryPoints - pointsAwarded, this.store.currentUser.gloryPoints);

      // 6. Victory Confetti
      this.triggerVictoryConfetti();

      // 7. Rank Promotion Triumph
      if (isRankUp) {
        setTimeout(() => {
          this.dom.promotionTitle.textContent = 'Imperial Rank Promoted!';
          this.dom.promotionRankBadge.textContent = newRank;
          this.dom.promotionDesc.textContent = `By decree of your tactical prowess, you have advanced to ${newRank}!`;
          this.dom.promotionPointsEarned.textContent = `+${pointsAwarded} CP Claimed • Glory Score: ${this.store.currentUser.gloryPoints} CP`;
          this.openModal(this.dom.promotionModal);
          this.audio.playFanfare();
        }, 350);
      }
    }

    animatePointsCounter(startVal, endVal) {
      const widgetScore = this.dom.widgetGloryPointsNum;
      const metricScore = this.dom.metricGloryScore;
      if (!widgetScore) return;

      widgetScore.classList.add('points-pulse-active');
      if (metricScore) metricScore.classList.add('points-pulse-active');

      const duration = 600;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(startVal + (endVal - startVal) * progress);
        widgetScore.textContent = current;
        if (metricScore) metricScore.textContent = `${current} CP`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          widgetScore.textContent = endVal;
          if (metricScore) metricScore.textContent = `${endVal} CP`;
          setTimeout(() => {
            widgetScore.classList.remove('points-pulse-active');
            if (metricScore) metricScore.classList.remove('points-pulse-active');
          }, 300);
        }
      };

      requestAnimationFrame(step);
    }

    updateNextMissionSpotlight() {
      if (!this.dom.spotlightNextTitle) return;

      if (this.store.classAssignments.length === 0) {
        this.dom.spotlightNextTitle.textContent = 'No Missions Decreed Yet';
        this.dom.spotlightNextDesc.textContent = 'Awaiting strategic orders from the Grand Marshal. Use Admin mode (Passkey: NaughtyAlakhpandey) to decree assignments.';
        this.dom.spotlightConquerBtn.hidden = true;
        return;
      }

      const completedIds = this.store.currentUser && this.store.currentUser.completedAssignmentIds ? this.store.currentUser.completedAssignmentIds : [];
      const pending = this.store.classAssignments.find(a => !completedIds.includes(a.id));

      if (pending) {
        const sub = SUBJECTS[pending.subject] || { short: pending.subject };
        this.dom.spotlightNextTitle.textContent = pending.title;
        this.dom.spotlightNextDesc.textContent = `${sub.short || pending.subject} • Reward: +${pending.points} Glory Points`;
        this.dom.spotlightConquerBtn.hidden = false;
      } else {
        this.dom.spotlightNextTitle.textContent = 'All Assignments Conquered! 👑';
        this.dom.spotlightNextDesc.textContent = 'You reign victorious atop the imperial syllabus. Decreed missions are complete.';
        this.dom.spotlightConquerBtn.hidden = true;
      }
    }

    // =======================================================================
    // 10. MODAL HELPERS & CANVAS
    // =======================================================================

    openConfirmConquerModal(taskId, isClassTab) {
      const list = isClassTab ? this.store.classAssignments : this.store.personalDirectives;
      const task = list.find(t => t.id === taskId);
      if (!task) return;

      this.pendingConquer = { taskId, isClassTab };
      const sub = SUBJECTS[task.subject] || { short: task.subject, code: task.subject };

      if (this.dom.confirmTaskSubject) {
        this.dom.confirmTaskSubject.textContent = sub.short || sub.code || 'Course';
      }
      if (this.dom.confirmTaskTitle) {
        this.dom.confirmTaskTitle.textContent = task.title;
      }

      if (isClassTab) {
        if (this.dom.confirmTaskPointsBadge) {
          this.dom.confirmTaskPointsBadge.hidden = false;
          this.dom.confirmTaskPointsBadge.textContent = `⚡ +${task.points || 100} CP`;
        }
        if (this.dom.confirmTaskRewardNotice) {
          this.dom.confirmTaskRewardNotice.innerHTML = `👑 Upon your reconfirmation that this task is over, <strong>+${task.points || 100} Glory Points</strong> will be credited to your cadet account immediately!`;
        }
      } else {
        if (this.dom.confirmTaskPointsBadge) {
          this.dom.confirmTaskPointsBadge.hidden = true;
        }
        if (this.dom.confirmTaskRewardNotice) {
          this.dom.confirmTaskRewardNotice.innerHTML = `📜 Upon your reconfirmation that this directive is over, it will be registered as <strong>Conquered</strong> in your personal war council records.`;
        }
      }

      this.openModal(this.dom.confirmConquerModal);
    }

    openPasskeyModal() {
      this.dom.adminPasskeyInput.value = '';
      this.dom.passkeyErrorBanner.hidden = true;
      this.openModal(this.dom.adminPasskeyModal);
      setTimeout(() => this.dom.adminPasskeyInput.focus(), 60);
    }

    refreshCharacterCardsAvailability() {
      if (!this.dom.characterSelectGrid) return;

      const currentUserId = this.store.currentUser ? this.store.currentUser.id : null;
      // Map of claimed commanders: cmdId -> cadet name
      const claimedMap = new Map();
      this.store.cohortRoster.forEach(u => {
        if (u.commanderId) {
          // If current user is already registered with this id, do not lock them out of their own avatar
          if (!currentUserId || u.id !== currentUserId) {
            claimedMap.set(u.commanderId, u.name);
          }
        }
      });

      const cards = this.dom.characterSelectGrid.querySelectorAll('.character-card');
      let firstAvailableCard = null;
      let activeCard = null;

      cards.forEach(card => {
        const cmd = card.dataset.cmd;
        const claimedBy = claimedMap.get(cmd);

        // Remove any prior claimed tags
        const existingTag = card.querySelector('.claimed-overlay-tag');
        if (existingTag) existingTag.remove();

        if (claimedBy) {
          card.classList.add('claimed');
          card.classList.remove('active');
          card.setAttribute('aria-disabled', 'true');
          card.title = `Pledged to Cadet ${claimedBy} (Unavailable)`;

          const tag = document.createElement('span');
          tag.className = 'claimed-overlay-tag';
          tag.textContent = `🔒 ${claimedBy}`;
          card.appendChild(tag);
        } else {
          card.classList.remove('claimed');
          card.removeAttribute('aria-disabled');
          card.title = '';
          if (!firstAvailableCard) {
            firstAvailableCard = card;
          }
          if (card.classList.contains('active')) {
            activeCard = card;
          }
        }
      });

      // If active card was claimed or nothing is active, activate the first available card
      if (!activeCard && firstAvailableCard) {
        firstAvailableCard.classList.add('active');
      } else if (this.store.currentUser && this.store.currentUser.commanderId) {
        // Highlight active user's bound conqueror
        const userCard = Array.from(cards).find(c => c.dataset.cmd === this.store.currentUser.commanderId);
        if (userCard) {
          cards.forEach(c => c.classList.remove('active'));
          userCard.classList.add('active');
        }
      }
    }

    openEnlistModal() {
      const isFirstTime = !this.store.currentUser;
      if (!isFirstTime) {
        this.dom.enlistNameInput.value = this.store.currentUser.name;
        this.dom.closeEnlistBtn.hidden = false;
      } else {
        this.dom.enlistNameInput.value = '';
        this.dom.closeEnlistBtn.hidden = true;
      }

      if (this.dom.enlistErrorBanner) {
        this.dom.enlistErrorBanner.hidden = true;
        this.dom.enlistErrorBanner.textContent = '';
      }

      this.refreshCharacterCardsAvailability();
      this.openModal(this.dom.enlistModal);
      if (isFirstTime) {
        setTimeout(() => this.dom.enlistNameInput.focus(), 60);
      }
    }

    openAdminModal() {
      this.dom.adminAssignmentForm.reset();
      this.dom.adminAssignDueDate.value = getRelativeDate(2);
      this.dom.adminAssignPoints.value = '100';
      if (this.dom.quickPointsChips) {
        this.dom.quickPointsChips.querySelectorAll('.chip-pts').forEach(b => {
          b.classList.toggle('active', b.dataset.pts === '100');
        });
      }
      this.openModal(this.dom.adminAssignmentModal);
    }

    openPersonalModal() {
      this.dom.personalDirectiveForm.reset();
      this.dom.personalDueDate.value = getRelativeDate(1);
      this.openModal(this.dom.personalDirectiveModal);
    }

    openModal(modal) {
      if (modal) modal.hidden = false;
    }

    closeModal(modal) {
      if (modal) modal.hidden = true;
    }

    closeAllModals() {
      this.closeModal(this.dom.enlistModal);
      this.closeModal(this.dom.adminAssignmentModal);
      this.closeModal(this.dom.personalDirectiveModal);
      this.closeModal(this.dom.shortcutsModal);
      if (this.dom.adminPasskeyModal) this.closeModal(this.dom.adminPasskeyModal);
      if (this.dom.googleAuthModal) this.closeModal(this.dom.googleAuthModal);
      if (this.dom.promotionModal) this.closeModal(this.dom.promotionModal);
      if (this.dom.confirmConquerModal) this.closeModal(this.dom.confirmConquerModal);
    }

    showToast(message) {
      this.dom.toastMessage.textContent = message;
      this.dom.appToast.hidden = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.dom.appToast.hidden = true;
      }, 3500);
    }

    initCanvasConfetti() {
      const canvas = this.dom.victoryCanvas;
      this.canvasCtx = canvas.getContext('2d');
      this.confettiParticles = [];

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();
    }

    triggerVictoryConfetti() {
      const canvas = this.dom.victoryCanvas;
      const count = 65;
      const colors = ['#c9a050', '#f3e5c8', '#dfb76c', '#84232c', '#ffffff'];

      for (let i = 0; i < count; i++) {
        this.confettiParticles.push({
          x: canvas.width / 2 + (Math.random() * 200 - 100),
          y: canvas.height / 3 + (Math.random() * 100 - 50),
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 1.2) * 9,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 7 + 4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          life: 1
        });
      }

      if (!this.confettiRunning) {
        this.confettiRunning = true;
        this.animateConfetti();
      }
    }

    animateConfetti() {
      const ctx = this.canvasCtx;
      const canvas = this.dom.victoryCanvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
        const p = this.confettiParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25;
        p.rotation += p.rotationSpeed;
        p.life -= 0.018;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        if (p.life <= 0 || p.y > canvas.height) {
          this.confettiParticles.splice(i, 1);
        }
      }

      if (this.confettiParticles.length > 0) {
        requestAnimationFrame(() => this.animateConfetti());
      } else {
        this.confettiRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  }

  // Launch on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    window.imperiumApp = new ImperiumApp();
  });
})();
