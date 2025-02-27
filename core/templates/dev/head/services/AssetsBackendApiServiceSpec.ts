// Copyright 2017 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit tests for AssetsBackendApiService
 */

// TODO(#7222): Remove the following block of unnnecessary imports once
// AssetsBackendApiService.ts is upgraded to Angular 8.
import { AudioFileObjectFactory } from
  'domain/utilities/AudioFileObjectFactory';
import { FileDownloadRequestObjectFactory } from
  'domain/utilities/FileDownloadRequestObjectFactory';
import { ImageFileObjectFactory } from
  'domain/utilities/ImageFileObjectFactory';
import { UpgradedServices } from 'services/UpgradedServices';
// ^^^ This block is to be removed.

require('domain/utilities/UrlInterpolationService.ts');
require('services/AssetsBackendApiService.ts');

describe('Assets Backend API Service', function() {
  var AssetsBackendApiService = null;
  var fileDownloadRequestObjectFactory = null;
  var UrlInterpolationService = null;
  var $httpBackend = null;
  var $rootScope = null;
  var $q = null;
  var ENTITY_TYPE = null;

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('AudioFileObjectFactory', new AudioFileObjectFactory());
    $provide.value(
      'FileDownloadRequestObjectFactory',
      new FileDownloadRequestObjectFactory());
    $provide.value('ImageFileObjectFactory', new ImageFileObjectFactory());
  }));
  beforeEach(angular.mock.module('oppia', function($provide) {
    var ugs = new UpgradedServices();
    for (let [key, value] of Object.entries(ugs.upgradedServices)) {
      $provide.value(key, value);
    }
  }));

  beforeEach(angular.mock.inject(function($injector) {
    AssetsBackendApiService = $injector.get(
      'AssetsBackendApiService');
    fileDownloadRequestObjectFactory = $injector.get(
      'FileDownloadRequestObjectFactory');
    UrlInterpolationService = $injector.get(
      'UrlInterpolationService');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    ENTITY_TYPE = $injector.get('ENTITY_TYPE');
    $q = $injector.get('$q');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should correctly formulate the download URL', function() {
    // TODO(sll): Find a way to substitute out constants.DEV_MODE so that we
    // can test the production URL, too.
    expect(
      AssetsBackendApiService.getAudioDownloadUrl(
        ENTITY_TYPE.EXPLORATION, 'expid12345', 'a.mp3')
    ).toEqual('/assetsdevhandler/exploration/expid12345/assets/audio/a.mp3');
  });

  it('should successfully fetch and cache audio', function() {
    var successHandler = jasmine.createSpy('success');
    var failHandler = jasmine.createSpy('fail');

    var requestUrl = UrlInterpolationService.interpolateUrl(
      '/assetsdevhandler/exploration/<exploration_id>/assets/audio/<filename>',
      {
        exploration_id: '0',
        filename: 'myfile.mp3'
      });

    $httpBackend.expect('GET', requestUrl).respond(201, 'audio data');
    expect(AssetsBackendApiService.isCached('myfile.mp3')).toBe(false);


    AssetsBackendApiService.loadAudio('0', 'myfile.mp3').then(
      successHandler, failHandler);
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .audio.length).toBe(1);
    $httpBackend.flush();
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .audio.length).toBe(0);
    expect(AssetsBackendApiService.isCached('myfile.mp3')).toBe(true);
    expect(successHandler).toHaveBeenCalled();
    expect(failHandler).not.toHaveBeenCalled();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should successfully fetch and cache image', function() {
    var successHandler = jasmine.createSpy('success');
    var failHandler = jasmine.createSpy('fail');

    var requestUrl = UrlInterpolationService.interpolateUrl(
      '/assetsdevhandler/exploration/<exploration_id>/assets/image/<filename>',
      {
        exploration_id: '0',
        filename: 'myfile.png'
      });

    $httpBackend.expect('GET', requestUrl).respond(201, 'image data');
    expect(AssetsBackendApiService.isCached('myfile.png')).toBe(false);


    AssetsBackendApiService.loadImage(
      ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
      successHandler, failHandler);
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .image.length).toBe(1);
    $httpBackend.flush();
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .image.length).toBe(0);
    expect(AssetsBackendApiService.isCached('myfile.png')).toBe(true);
    expect(successHandler).toHaveBeenCalled();
    expect(failHandler).not.toHaveBeenCalled();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should call the provided failure handler on HTTP failure for an audio',
    function() {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      var requestUrl = UrlInterpolationService.interpolateUrl(
        '/assetsdevhandler/exploration/<exploration_id>/assets/audio/' +
        '<filename>', {
          exploration_id: '0',
          filename: 'myfile.mp3'
        });

      $httpBackend.expect('GET', requestUrl).respond(500, 'MutagenError');
      AssetsBackendApiService.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);
      $httpBackend.flush();

      expect(successHandler).not.toHaveBeenCalled();
      expect(failHandler).toHaveBeenCalled();
      $httpBackend.verifyNoOutstandingExpectation();
    });

  it('should call the provided failure handler on HTTP failure for an image',
    function() {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      var requestUrl = UrlInterpolationService.interpolateUrl(
        '/assetsdevhandler/exploration/<exploration_id>/assets/image/' +
        '<filename>', {
          exploration_id: '0',
          filename: 'myfile.png'
        });

      $httpBackend.expect('GET', requestUrl).respond(500, 'Error');
      AssetsBackendApiService.loadImage(
        ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
        successHandler, failHandler);
      $httpBackend.flush();

      expect(successHandler).not.toHaveBeenCalled();
      expect(failHandler).toHaveBeenCalled();
      $httpBackend.verifyNoOutstandingExpectation();
    });

  it('should successfully abort the download of all the audio files',
    function() {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      var requestUrl = UrlInterpolationService.interpolateUrl(
        '/assetsdevhandler/exploration/<exploration_id>/assets/audio/' +
        '<filename>', {
          exploration_id: '0',
          filename: 'myfile.mp3'
        });

      $httpBackend.expect('GET', requestUrl).respond(201, 'audio data');

      AssetsBackendApiService.loadAudio('0', 'myfile.mp3').then(
        successHandler, failHandler);

      expect(AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested()
        .audio.length).toBe(1);

      AssetsBackendApiService.abortAllCurrentAudioDownloads();
      $httpBackend.verifyNoOutstandingRequest();
      expect(AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested()
        .audio.length).toBe(0);
      expect(AssetsBackendApiService.isCached('myfile.mp3')).toBe(false);
    });

  it('should successfully abort the download of the all the image files',
    function() {
      var successHandler = jasmine.createSpy('success');
      var failHandler = jasmine.createSpy('fail');

      var requestUrl = UrlInterpolationService.interpolateUrl(
        'assetsdevhandler/exploration/<exploration_id>/assets/image/<filename>',
        {
          exploration_id: '0',
          filename: 'myfile.png'
        });

      $httpBackend.expect('GET', requestUrl).respond(201, 'image data');

      AssetsBackendApiService.loadImage(
        ENTITY_TYPE.EXPLORATION, '0', 'myfile.png').then(
        successHandler, failHandler);

      expect(AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested()
        .image.length).toBe(1);

      AssetsBackendApiService.abortAllCurrentImageDownloads();
      $httpBackend.verifyNoOutstandingRequest();
      expect(AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested()
        .image.length).toBe(0);
      expect(AssetsBackendApiService.isCached('myfile.png')).toBe(false);
    });

  it('should use the correct blob type for audio assets', function() {
    var successHandler = jasmine.createSpy('success');
    var failHandler = jasmine.createSpy('fail');

    var requestUrl = UrlInterpolationService.interpolateUrl(
      '/assetsdevhandler/exploration/<exploration_id>/assets/audio/<filename>',
      {
        exploration_id: '0',
        filename: 'myfile.mp3'
      });

    $httpBackend.expect('GET', requestUrl).respond(201, 'audio data');
    AssetsBackendApiService.loadAudio('0', 'myfile.mp3').then(
      successHandler, failHandler);
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .audio.length).toBe(1);
    $httpBackend.flush();
    expect((AssetsBackendApiService.getAssetsFilesCurrentlyBeingRequested())
      .audio.length).toBe(0);

    expect(successHandler).toHaveBeenCalled();
    expect(failHandler).not.toHaveBeenCalled();
    expect(successHandler.calls.first().args[0].data.type).toBe('audio/mpeg');
    $httpBackend.verifyNoOutstandingExpectation();
  });
});
