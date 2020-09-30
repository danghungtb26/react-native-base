require 'json'

Pod::Spec.new do |s|
  s.name         = 'appbase'
  s.version      = '1.0.0'
  s.summary      = 'a'
  s.license      = ''

  s.authors      = 'danghungtb26'
  s.homepage     = 'a'
  s.platforms    = { ios: '9.0', tvos: '9.2', osx: '10.14' }

  s.source       = { git: 'https://github.com/react-native-community/react-native-async-storage.git', tag: "v#{s.version}" }
  s.source_files = '*.{h,m}'

  s.dependency 'React'
end
