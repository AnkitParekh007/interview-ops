#!/usr/bin/env node
import 'dotenv/config';
import { Command } from 'commander';
import { createInitCommand } from './commands/init.command.js';
import { createDoctorCommand } from './commands/doctor.command.js';
import { createProvidersCommand } from './commands/providers.command.js';
import { createTracksCommand } from './commands/tracks.command.js';
import { createModesCommand } from './commands/modes.command.js';
import { createSimulateCommand } from './commands/simulate.command.js';
import { createStartCommand } from './commands/start.command.js';
import { createPlanCommand } from './commands/plan.command.js';
import { createAnswerCommand } from './commands/answer.command.js';
import { createVerifyCommand } from './commands/verify.command.js';
import { createExamplesCommand } from './commands/examples.command.js';

const program = new Command();

program
  .name('interviewops')
  .description('Open-source AI interview practice system for developers')
  .version('0.1.0');

program.addCommand(createInitCommand());
program.addCommand(createDoctorCommand());
program.addCommand(createProvidersCommand());
program.addCommand(createTracksCommand());
program.addCommand(createModesCommand());
program.addCommand(createSimulateCommand());
program.addCommand(createStartCommand());
program.addCommand(createPlanCommand());
program.addCommand(createAnswerCommand());
program.addCommand(createVerifyCommand());
program.addCommand(createExamplesCommand());

program.parse(process.argv);
