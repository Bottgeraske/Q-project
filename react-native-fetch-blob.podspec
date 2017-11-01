PodSpec.new do s
  s.name             = react-native-fetch-blob
  s.version          = 0.10.1
  s.summary          = A project committed to make file acess and data transfer easier, effiecient for React Native developers.
  s.requires_arc = true
  s.license      = 'MIT'
  s.homepage     = 'na'
  s.authors      = { wkh237 = xeiyan@gmail.com }
  s.source       = { git = httpsgithub.comwkh237react-native-fetch-blob, tag = 'v0.10.1'}
  s.source_files = 'ios.{h,m}'
  s.platform     = ios, 7.0
  s.dependency 'ReactCore'
end