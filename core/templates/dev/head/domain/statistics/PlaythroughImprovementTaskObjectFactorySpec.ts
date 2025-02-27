// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for the PlaythroughImprovementTaskObjectFactory.
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// PlaythroughImprovementTaskObjectFactory.ts is upgraded to Angular 8.
import { AngularNameService } from
  'pages/exploration-editor-page/services/angular-name.service';
import { AnswerClassificationResultObjectFactory } from
  'domain/classifier/AnswerClassificationResultObjectFactory';
import { AnswerGroupObjectFactory } from
  'domain/exploration/AnswerGroupObjectFactory';
import { ClassifierObjectFactory } from
  'domain/classifier/ClassifierObjectFactory';
import { EditabilityService } from 'services/EditabilityService';
import { ExplorationDraftObjectFactory } from
  'domain/exploration/ExplorationDraftObjectFactory';
import { FeedbackThreadObjectFactory } from
  'domain/feedback_thread/FeedbackThreadObjectFactory';
import { FractionObjectFactory } from 'domain/objects/FractionObjectFactory';
import { HintObjectFactory } from 'domain/exploration/HintObjectFactory';
import { ImprovementActionButtonObjectFactory } from
  'domain/statistics/ImprovementActionButtonObjectFactory';
import { LearnerActionObjectFactory } from
  'domain/statistics/LearnerActionObjectFactory';
import { OutcomeObjectFactory } from
  'domain/exploration/OutcomeObjectFactory';
import { ParamChangeObjectFactory } from
  'domain/exploration/ParamChangeObjectFactory';
import { ParamChangesObjectFactory } from
  'domain/exploration/ParamChangesObjectFactory';
import { PlaythroughIssueObjectFactory } from
  'domain/statistics/PlaythroughIssueObjectFactory';
import { PlaythroughObjectFactory } from
  'domain/statistics/PlaythroughObjectFactory';
import { RecordedVoiceoversObjectFactory } from
  'domain/exploration/RecordedVoiceoversObjectFactory';
import { RuleObjectFactory } from 'domain/exploration/RuleObjectFactory';
/* eslint-disable max-len */
import { SolutionValidityService } from
  'pages/exploration-editor-page/editor-tab/services/solution-validity.service';
import { StateClassifierMappingService } from
  'pages/exploration-player-page/services/state-classifier-mapping.service';
/* eslint-disable max-len */
import { StateEditorService } from
  'components/state-editor/state-editor-properties-services/state-editor.service';
/* eslint-enable max-len */
import { SubtitledHtmlObjectFactory } from
  'domain/exploration/SubtitledHtmlObjectFactory';
/* eslint-enable max-len */
import { SuggestionModalService } from 'services/SuggestionModalService';
import { SuggestionObjectFactory } from
  'domain/suggestion/SuggestionObjectFactory';
/* eslint-disable max-len */
import { ThreadStatusDisplayService } from
  'pages/exploration-editor-page/feedback-tab/services/thread-status-display.service';
/* eslint-enable max-len */
import { UnitsObjectFactory } from 'domain/objects/UnitsObjectFactory';
import { UserInfoObjectFactory } from 'domain/user/UserInfoObjectFactory';
import { VoiceoverObjectFactory } from
  'domain/exploration/VoiceoverObjectFactory';
import { WrittenTranslationObjectFactory } from
  'domain/exploration/WrittenTranslationObjectFactory';
import { WrittenTranslationsObjectFactory } from
  'domain/exploration/WrittenTranslationsObjectFactory';
import { LearnerAnswerDetailsObjectFactory } from
  'domain/statistics/LearnerAnswerDetailsObjectFactory';
import { LearnerAnswerInfoObjectFactory } from
  'domain/statistics/LearnerAnswerInfoObjectFactory';
import { UpgradedServices } from 'services/UpgradedServices';
// ^^^ This block is to be removed.

require('domain/statistics/PlaythroughImprovementTaskObjectFactory');

describe('PlaythroughImprovementTaskObjectFactory', function() {
  var $q = null;
  var $rootScope = null;
  var $uibModal = null;
  var PlaythroughImprovementTaskObjectFactory = null;
  var playthroughIssueObjectFactory = null;
  var PlaythroughIssuesService = null;
  var PLAYTHROUGH_IMPROVEMENT_TASK_TYPE = null;

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('AngularNameService', new AngularNameService());
    $provide.value(
      'AnswerClassificationResultObjectFactory',
      new AnswerClassificationResultObjectFactory());
    $provide.value(
      'AnswerGroupObjectFactory',
      new AnswerGroupObjectFactory(
        new OutcomeObjectFactory(new SubtitledHtmlObjectFactory()),
        new RuleObjectFactory()));
    $provide.value('ClassifierObjectFactory', new ClassifierObjectFactory());
    $provide.value('EditabilityService', new EditabilityService());
    $provide.value(
      'ExplorationDraftObjectFactory', new ExplorationDraftObjectFactory());
    $provide.value(
      'FeedbackThreadObjectFactory', new FeedbackThreadObjectFactory());
    $provide.value('FractionObjectFactory', new FractionObjectFactory());
    $provide.value(
      'HintObjectFactory',
      new HintObjectFactory(new SubtitledHtmlObjectFactory()));
    $provide.value(
      'ImprovementActionButtonObjectFactory',
      new ImprovementActionButtonObjectFactory());
    $provide.value(
      'LearnerActionObjectFactory', new LearnerActionObjectFactory());
    $provide.value(
      'OutcomeObjectFactory',
      new OutcomeObjectFactory(new SubtitledHtmlObjectFactory()));
    $provide.value('ParamChangeObjectFactory', new ParamChangeObjectFactory());
    $provide.value(
      'ParamChangesObjectFactory', new ParamChangesObjectFactory(
        new ParamChangeObjectFactory()));
    $provide.value(
      'PlaythroughIssueObjectFactory', new PlaythroughIssueObjectFactory());
    $provide.value(
      'PlaythroughObjectFactory', new PlaythroughObjectFactory(
        new LearnerActionObjectFactory()));
    $provide.value(
      'RecordedVoiceoversObjectFactory',
      new RecordedVoiceoversObjectFactory(new VoiceoverObjectFactory()));
    $provide.value('RuleObjectFactory', new RuleObjectFactory());
    $provide.value('SolutionValidityService', new SolutionValidityService());
    $provide.value(
      'StateClassifierMappingService', new StateClassifierMappingService(
        new ClassifierObjectFactory()));
    $provide.value(
      'StateEditorService', new StateEditorService(
        new SolutionValidityService()));
    $provide.value(
      'SubtitledHtmlObjectFactory', new SubtitledHtmlObjectFactory());
    $provide.value('SuggestionModalService', new SuggestionModalService());
    $provide.value('SuggestionObjectFactory', new SuggestionObjectFactory());
    $provide.value(
      'ThreadStatusDisplayService', new ThreadStatusDisplayService());
    $provide.value('UnitsObjectFactory', new UnitsObjectFactory());
    $provide.value('UserInfoObjectFactory', new UserInfoObjectFactory());
    $provide.value('VoiceoverObjectFactory', new VoiceoverObjectFactory());
    $provide.value(
      'WrittenTranslationObjectFactory', new WrittenTranslationObjectFactory());
    $provide.value(
      'WrittenTranslationsObjectFactory',
      new WrittenTranslationsObjectFactory(
        new WrittenTranslationObjectFactory()));
    $provide.value(
      'LearnerAnswerDetailsObjectFactory',
      new LearnerAnswerDetailsObjectFactory());
    $provide.value(
      'LearnerAnswerInfoObjectFactory', new LearnerAnswerInfoObjectFactory());
  }));
  beforeEach(angular.mock.module('oppia', function($provide) {
    var ugs = new UpgradedServices();
    for (let [key, value] of Object.entries(ugs.upgradedServices)) {
      $provide.value(key, value);
    }
  }));

  beforeEach(angular.mock.inject(function(
      _$q_, _$rootScope_, _$uibModal_,
      _PlaythroughImprovementTaskObjectFactory_,
      _PlaythroughIssueObjectFactory_, _PlaythroughIssuesService_,
      _PLAYTHROUGH_IMPROVEMENT_TASK_TYPE_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $uibModal = _$uibModal_;
    PlaythroughImprovementTaskObjectFactory =
      _PlaythroughImprovementTaskObjectFactory_;
    playthroughIssueObjectFactory = _PlaythroughIssueObjectFactory_;
    PlaythroughIssuesService = _PlaythroughIssuesService_;
    PLAYTHROUGH_IMPROVEMENT_TASK_TYPE = _PLAYTHROUGH_IMPROVEMENT_TASK_TYPE_;

    PlaythroughIssuesService.initSession(expId, expVersion);

    var expId = '7';
    var expVersion = 1;
    this.scope = $rootScope.$new();
  }));

  describe('.createNew', function() {
    it('retrieves data from passed issue', function() {
      var issue = playthroughIssueObjectFactory.createFromBackendDict({
        issue_type: 'EarlyQuit',
        issue_customization_args: {
          state_name: {value: 'Hola'},
          time_spent_in_exp_in_msecs: {value: 5000},
        },
        playthrough_ids: ['1', '2'],
        schema_version: 1,
        is_valid: true,
      });

      var task = PlaythroughImprovementTaskObjectFactory.createNew(issue);

      expect(task.getTitle()).toEqual(
        PlaythroughIssuesService.renderIssueStatement(issue));
      expect(task.getDirectiveData()).toEqual({
        title: PlaythroughIssuesService.renderIssueStatement(issue),
        suggestions:
          PlaythroughIssuesService.renderIssueSuggestions(issue),
        playthroughIds: ['1', '2'],
      });
      expect(task.getDirectiveType()).toEqual(
        PLAYTHROUGH_IMPROVEMENT_TASK_TYPE);
    });
  });

  describe('.fetchTasks', function() {
    it('returns a task for each existing issue', function(done) {
      var earlyQuitIssue =
        playthroughIssueObjectFactory.createFromBackendDict({
          issue_type: 'EarlyQuit',
          issue_customization_args: {
            state_name: {value: 'Hola'},
            time_spent_in_exp_in_msecs: {value: 5000},
          },
          playthrough_ids: [],
          schema_version: 1,
          is_valid: true,
        });
      var earlyQuitTaskTitle =
        PlaythroughIssuesService.renderIssueStatement(earlyQuitIssue);

      var multipleIncorrectSubmissionsIssue =
        playthroughIssueObjectFactory.createFromBackendDict({
          issue_type: 'MultipleIncorrectSubmissions',
          issue_customization_args: {
            state_name: {value: 'Hola'},
            num_times_answered_incorrectly: {value: 4},
          },
          playthrough_ids: [],
          schema_version: 1,
          is_valid: true,
        });
      var multipleIncorrectSubmissionsTaskTitle =
        PlaythroughIssuesService.renderIssueStatement(
          multipleIncorrectSubmissionsIssue);

      var cyclicTransitionsIssue =
        playthroughIssueObjectFactory.createFromBackendDict({
          issue_type: 'CyclicTransitions',
          issue_customization_args: {
            state_names: {value: ['Hola', 'Me Llamo', 'Hola']},
          },
          playthrough_ids: [],
          schema_version: 1,
          is_valid: true,
        });
      var cyclicTransitionsTaskTitle =
        PlaythroughIssuesService.renderIssueStatement(
          cyclicTransitionsIssue);

      spyOn(PlaythroughIssuesService, 'getIssues').and.returnValue(
        $q.resolve([
          earlyQuitIssue,
          multipleIncorrectSubmissionsIssue,
          cyclicTransitionsIssue,
        ]));

      PlaythroughImprovementTaskObjectFactory.fetchTasks()
        .then(function(tasks) {
          expect(tasks.length).toEqual(3);
          expect(tasks[0].getTitle()).toEqual(earlyQuitTaskTitle);
          expect(tasks[1].getTitle())
            .toEqual(multipleIncorrectSubmissionsTaskTitle);
          expect(tasks[2].getTitle()).toEqual(cyclicTransitionsTaskTitle);
        }).then(done, done.fail);

      this.scope.$digest(); // Forces all pending promises to evaluate.
    });
  });

  describe('PlaythroughImprovementTask', function() {
    beforeEach(function() {
      this.issue = playthroughIssueObjectFactory.createFromBackendDict({
        issue_type: 'EarlyQuit',
        issue_customization_args: {
          state_name: {value: 'Hola'},
          time_spent_in_exp_in_msecs: {value: 5000},
        },
        playthrough_ids: [],
        schema_version: 1,
        is_valid: true,
      });
      this.task = PlaythroughImprovementTaskObjectFactory.createNew(this.issue);
    });

    describe('.getActionButtons', function() {
      it('contains a specific sequence of buttons', function() {
        expect(this.task.getActionButtons().length).toEqual(1);
        expect(this.task.getActionButtons()[0].getText())
          .toEqual('Mark as Resolved');
      });
    });

    describe('Mark as Resolved Action Button', function() {
      it('marks the task as resolved after confirmation', function() {
        var task = this.task;
        var issue = this.issue;
        var resolveActionButton = task.getActionButtons()[0];
        var resolveIssueSpy =
          spyOn(PlaythroughIssuesService, 'resolveIssue').and.stub();

        spyOn($uibModal, 'open').and.returnValue({
          result: $q.resolve(), // Returned when confirm button is pressed.
        });

        expect(task.getStatus()).toEqual('open');
        resolveActionButton.execute();

        this.scope.$digest(); // Forces all pending promises to evaluate.

        expect(resolveIssueSpy).toHaveBeenCalledWith(issue);
        expect(task.getStatus()).not.toEqual('open');
      });

      it('keeps the task after cancel', function() {
        var task = this.task;
        var issue = this.issue;
        var resolveActionButton = task.getActionButtons()[0];
        var resolveIssueSpy =
          spyOn(PlaythroughIssuesService, 'resolveIssue').and.stub();

        spyOn($uibModal, 'open').and.returnValue({
          result: $q.reject(), // Returned when cancel button is pressed.
        });

        expect(task.getStatus()).toEqual('open');
        resolveActionButton.execute();
        this.scope.$digest(); // Forces all pending promises to evaluate.

        expect(resolveIssueSpy).not.toHaveBeenCalled();
        expect(task.getStatus()).toEqual('open');
      });
    });
  });
});
